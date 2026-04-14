'use client';
import Image from 'next/image';
import { Box } from '../global/matic-ds';
import Link from 'next/link';
import { BlurFade } from '../magicui/BlurFade';
import { FloatingLabelInput, FloatingLabelTextarea } from '../ui/floating-label';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { RecaptchaCheckbox } from '../ui/recaptcha-checkbox';
import { useFiberyAPI, type FiberyType, type FiberyField } from '@/lib/fibrey';

// Dynamic form schema based on Fibery form fields
const createFormSchema = (fields: FiberyField[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};
  
  fields.forEach(field => {
    let fieldSchema: z.ZodString = z.string();
    const fieldName = field['fibery/name'];
    const fieldType = field['field/type'];
    const isRequired = field['field/meta']?.['field/required'] || false;
    
    // Apply type-specific validations based on Fibery field types
    switch (fieldType) {
      case 'Email':
      case 'fibery/email':
        fieldSchema = fieldSchema.email('This is not a valid email.');
        break;
      case 'Phone':
      case 'fibery/phone':
        fieldSchema = fieldSchema.max(20, 'Phone number must not be longer than 20 characters.');
        break;
      case 'Rich Text':
      case 'fibery/rich-text':
      case 'Text':
      case 'fibery/text':
        if (fieldName.toLowerCase().includes('message')) {
          fieldSchema = fieldSchema.max(500, 'Message must not be longer than 500 characters.');
        }
        break;
    }
    
    // Apply required validation
    if (isRequired) {
      fieldSchema = fieldSchema.min(1, 'This field is required.');
      schemaFields[fieldName] = fieldSchema;
    } else {
      schemaFields[fieldName] = fieldSchema.optional();
    }
  });
  
  // Always add recaptcha
  schemaFields.recaptchaToken = z.string().min(1, { message: 'Please verify that you are human.' });
  
  return z.object(schemaFields);
};

interface FiberyContactFormProps {
  // No formId needed - we'll use a predefined contact form type
}

export function FiberyContactForm({}: FiberyContactFormProps = {}) {
  const { toast } = useToast();
  const fiberyAPI = useFiberyAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [fiberyFormType, setFiberyFormType] = useState<FiberyType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>('New project');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load form schema from Fibery (only once)
  useEffect(() => {
    let isMounted = true;
    
    const loadForm = async () => {
      try {
        const formType = await fiberyAPI.getContactFormType();
        if (isMounted) {
          setFiberyFormType(formType);
        }
      } catch (error) {
        console.error('Failed to load Fibery contact form type:', error);
        
        if (!isMounted) return;
        
        // Fallback to default form structure if Fibery isn't available
        const fallbackFormType: FiberyType = {
          'fibery/id': 'fallback-contact-form',
          'fibery/name': 'Contact Form',
          'fibery/fields': [
            {
              'fibery/id': 'name-field',
              'fibery/name': 'Name',
              'field/type': 'Text',
              'field/meta': {
                'ui/label': 'Full Name',
                'field/required': true
              }
            },
            {
              'fibery/id': 'email-field',
              'fibery/name': 'Email',
              'field/type': 'Email',
              'field/meta': {
                'ui/label': 'Email Address',
                'field/required': true
              }
            },
            {
              'fibery/id': 'message-field',
              'fibery/name': 'Message',
              'field/type': 'Rich Text',
              'field/meta': {
                'ui/label': 'Message',
                'field/required': true
              }
            }
          ]
        };
        
        setFiberyFormType(fallbackFormType);
        
        toast({
          title: 'Using fallback form',
          description: 'Fibery integration not available, using default form fields.',
          variant: 'default'
        });
      } finally {
        if (isMounted) {
          setFormLoading(false);
        }
      }
    };

    loadForm();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  // Create form schema and form instance
  const formSchema = fiberyFormType ? createFormSchema(fiberyFormType['fibery/fields']) : z.object({ recaptchaToken: z.string() });
  type FormData = Record<string, any> & { recaptchaToken: string };

  // Create default values with empty strings for all fields
  const getDefaultValues = (): FormData => {
    const defaults: FormData = { 
      recaptchaToken: '',
      Name: '',
      Email: '',
      Phone: '',
      Company: '',
      Message: ''
    };
    
    if (fiberyFormType?.['fibery/fields']) {
      fiberyFormType['fibery/fields'].forEach((field) => {
        if (!defaults[field['fibery/name']]) {
          defaults[field['fibery/name']] = '';
        }
      });
    }
    
    return defaults;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues()
  });

  // Reset form with proper default values when fiberyFormType loads (only once)
  const [formInitialized, setFormInitialized] = useState(false);
  
  useEffect(() => {
    if (fiberyFormType && !formInitialized) {
      form.reset(getDefaultValues());
      setFormInitialized(true);
    }
  }, [fiberyFormType, formInitialized]);

  // Update form when recaptcha token changes
  useEffect(() => {
    if (recaptchaToken && fiberyFormType) {
      form.setValue('recaptchaToken', recaptchaToken);
    }
  }, [recaptchaToken, form, fiberyFormType]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentError(null);

    if (!file) {
      setAttachment(null);
      return;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setAttachmentError('File size exceeds 10MB limit');
      setAttachment(null);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentError(null);
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle recaptcha verification
  const handleRecaptchaVerify = async (token: string) => {
    if (!token) {
      setRecaptchaToken('');
      return;
    }

    try {
      // Verify the token with our server-side API
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      interface VerifyResponse {
        success: boolean;
        verified: boolean;
        errors?: string[];
      }

      const data = (await response.json()) as VerifyResponse;

      if (data.success && data.verified) {
        setRecaptchaToken(token);
      } else {
        setRecaptchaToken('');
        console.error('reCAPTCHA verification failed:', data.errors);
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      setRecaptchaToken('');
    }
  };

  async function onSubmitHandler(data: FormData) {
    console.log('📝 Form submit handler called');
    console.log('📝 fiberyFormType:', fiberyFormType ? 'loaded' : 'NOT LOADED');
    
    if (!fiberyFormType) {
      console.error('❌ Cannot submit: fiberyFormType not loaded');
      toast({
        title: 'Form not ready',
        description: 'Please wait for the form to load and try again.',
        variant: 'destructive'
      });
      return;
    }
    
    // Verify reCAPTCHA token is present (skip on localhost)
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (!recaptchaToken && !isLocalhost) {
      toast({
        title: 'Verification Required',
        description: 'Please complete the reCAPTCHA verification.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!recaptchaToken && isLocalhost) {
      console.warn('⚠️ Localhost: Skipping reCAPTCHA verification');
    }
    
    setIsLoading(true);

    try {
      // Prepare submission data
      const submissionData: Record<string, string | File | null> = {};
      
      // Add form fields (excluding recaptchaToken as it's already verified)
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'recaptchaToken') {
          submissionData[key] = value as string;
        }
      });
      
      // Add metadata
      submissionData.timestamp = new Date().toISOString();
      submissionData.source = 'website_contact';
      submissionData.formType = selectedOption ?? 'Not specified';
      
      // Include verified token if available
      if (recaptchaToken) {
        submissionData.recaptchaToken = recaptchaToken;
      }
      
      // Add file if present
      if (attachment) {
        submissionData.attachment = attachment;
        submissionData.fileName = attachment.name;
        submissionData.fileSize = attachment.size.toString();
        submissionData.fileType = attachment.type;
      }

      // Submit to Fibery
      await fiberyAPI.submitContactForm(submissionData);

      toast({
        title: 'Success!',
        description: "Your message has been sent. We'll get back to you soon."
      });

      // Reset form with default values
      form.reset(getDefaultValues());
      setSelectedOption(null);
      removeAttachment();
      setRecaptchaToken(''); // Reset reCAPTCHA token
      setFormInitialized(false); // Allow form to reinitialize
      
      // Reset reCAPTCHA widget if available
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }
      
      // Reinitialize form after a brief delay
      setTimeout(() => {
        setFormInitialized(true);
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderField = (field: FiberyField) => {
    const commonProps = {
      className: "w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text",
      labelClassName: "dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text",
      borderClassName: "border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
    };

    const fieldName = field['fibery/name'];
    const fieldType = field['field/type'];
    const fieldLabel = field['field/meta']?.['ui/label'] || fieldName;

    // Determine input type based on Fibery field type
    let inputType = 'text';
    let isTextarea = false;
    
    switch (fieldType) {
      case 'Email':
      case 'fibery/email':
        inputType = 'email';
        break;
      case 'Phone':
      case 'fibery/phone':
        inputType = 'tel';
        break;
      case 'Rich Text':
      case 'fibery/rich-text':
      case 'Text':
      case 'fibery/text':
        // Always use textarea for rich text fields
        if (fieldType === 'Rich Text' || fieldType === 'fibery/rich-text') {
          isTextarea = true;
        }
        // Also use textarea for text fields with 'message' or 'description' in the name
        else if (fieldName.toLowerCase().includes('message') || fieldName.toLowerCase().includes('description')) {
          isTextarea = true;
        }
        break;
    }

    return (
      <FormField
        key={field['fibery/id']}
        control={form.control}
        name={fieldName}
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              {isTextarea ? (
                <FloatingLabelTextarea
                  id={fieldName}
                  label={fieldLabel}
                  {...formField}
                  className={`min-h-[100px] ${commonProps.className}`}
                  labelClassName={commonProps.labelClassName}
                  borderClassName={commonProps.borderClassName}
                />
              ) : (
                <FloatingLabelInput
                  id={fieldName}
                  label={fieldLabel}
                  type={inputType}
                  {...formField}
                  {...commonProps}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  if (formLoading) {
    return (
      <Box className="justify-center gap-[6.06rem]" direction={{ base: 'col', md: 'row' }}>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Box>
    );
  }

  if (!fiberyFormType) {
    return (
      <Box className="justify-center gap-[6.06rem]" direction={{ base: 'col', md: 'row' }}>
        <div className="flex items-center justify-center p-8">
          <p>Failed to load form. Please try again later.</p>
        </div>
      </Box>
    );
  }

  return (
    <>
      <Box className="justify-center gap-[6.06rem]" direction={{ base: 'col', md: 'row' }}>
        <div className="flex-shrink-0 md:w-[33rem]">
          <div className="sticky top-[12rem] pt-4">
            <BlurFade inView inViewMargin="-100px" direction="up" useBlur={false}>
              <Image
                src={
                  'https://images.ctfassets.net/17izd3p84uup/4sQbls9UNWOmwbDCbw4kpR/019aedbe2bbec027092e257d26518f83/image_753.svg'
                }
                alt="Contact form illustration"
                width={524}
                height={642}
                className="aspect-[262/321] h-[40.125rem] rounded-none border-none object-cover"
                priority
              />
            </BlurFade>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmitHandler,
              (errors) => {
                console.error('❌ Form validation errors:', errors);
                toast({
                  title: 'Validation Error',
                  description: 'Please check all required fields and try again.',
                  variant: 'destructive'
                });
              }
            )}
            className="flex flex-col gap-[2.06rem] md:w-[33.375rem]"
          >
            <Box className="items-end justify-between">
              <h2 className="">Let&apos;s talk</h2>
              <Link
                href="https://matic.applytojob.com/apply"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-base leading-[140%] no-underline transition-all hover:text-text hover:underline"
              >
                Explore careers
              </Link>
            </Box>
            <Box className="gap-[1.44rem]" direction="col">
              <label className="flex items-center gap-[0.69rem]">
                <div
                  className={`relative h-4 w-4 rounded-full border ${selectedOption === 'New project' ? 'border-[#000227] bg-[#000227]' : 'border-[#000227] bg-transparent'} flex items-center justify-center`}
                >
                  {selectedOption === 'New project' && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selectedOption === 'New project'}
                  onChange={() => setSelectedOption('New project')}
                  className="hidden"
                />
                New project
              </label>
              <label className="flex items-center gap-[0.69rem]">
                <div
                  className={`relative h-4 w-4 rounded-full border ${selectedOption === 'Something else' ? 'border-[#000227] bg-[#000227]' : 'border-[#000227] bg-transparent'} flex items-center justify-center`}
                >
                  {selectedOption === 'Something else' && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selectedOption === 'Something else'}
                  onChange={() => setSelectedOption('Something else')}
                  className="hidden"
                />
                Something else
              </label>
            </Box>
            <Box className="flex flex-col gap-[1rem]">
              {fiberyFormType['fibery/fields']
                .filter(field => {
                  const fieldName = field['fibery/name'];
                  // Filter out system/hidden Fibery fields
                  const systemFields = [
                    'fibery/id',
                    'fibery/public-id',
                    'fibery/creation-date',
                    'fibery/modification-date',
                    'fibery/created-by',
                    'fibery/rank',
                    'fibery/spec',
                    'fibery/timestamp',
                    'fibery/user'
                  ];
                  
                  // Check if it's a system field
                  if (systemFields.includes(fieldName)) {
                    return false;
                  }
                  
                  // Check if field name starts with fibery/ (other system fields)
                  if (fieldName.startsWith('fibery/')) {
                    return false;
                  }
                  
                  // Check if it's marked as readonly
                  if (field['field/meta']?.['fibery/readonly'] || field['fibery/meta']?.['fibery/readonly']) {
                    return false;
                  }
                  
                  return true;
                })
                .map(renderField)}

              {/* File Attachment Section */}
              <div>
                {!attachment && (
                  <div className="flex justify-end">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer whitespace-normal text-sm text-text/80 hover:text-text md:whitespace-nowrap"
                    >
                      <span>+ Add attachment</span>
                    </label>
                  </div>
                )}
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />

                {/* File size limit note - only shown when no attachment */}
                {!attachment && (
                  <div className="flex justify-end">
                    <span className="text-xs text-text/60">(max 10MB)</span>
                  </div>
                )}

                {/* reCAPTCHA Verification - Skip on localhost */}
                {typeof window !== 'undefined' && 
                 window.location.hostname !== 'localhost' && 
                 window.location.hostname !== '127.0.0.1' && (
                  <FormField
                    control={form.control}
                    name="recaptchaToken"
                    render={(_) => (
                      <FormItem className="mt-4">
                        <FormControl>
                          <RecaptchaCheckbox onVerify={handleRecaptchaVerify} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {attachmentError && <p className="mt-1 text-xs text-red-500">{attachmentError}</p>}

                {attachment && (
                  <>
                    <div className="mt-2 rounded-md border border-text/20 bg-text/5 p-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 truncate text-sm">
                          <span className="font-medium">{attachment.name}</span>
                          <span className="ml-1 text-xs text-text/60">
                            ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeAttachment}
                          className="rounded-full p-1 text-text/60 hover:bg-text/10 hover:text-text"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer whitespace-normal text-sm text-text/80 hover:text-text md:whitespace-nowrap"
                      >
                        <span>+ Change attachment</span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </Box>
            <Box className="justify-between">
              <p className="w-[11.4375rem] text-[0.75rem] leading-[120%] tracking-[-0.0225rem]">
                We&apos;ll never sell or abuse your email. By submitting this form you accept our
                Terms.
              </p>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
            </Box>
          </form>
        </Form>
      </Box>
    </>
  );
}
