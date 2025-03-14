'use client';
import Image from 'next/image';
import { Box } from '../global/matic-ds';
// Removed unused import
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
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { RecaptchaCheckbox } from '../ui/recaptcha-checkbox';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(30, { message: 'Name must not be longer than 30 characters.' }),
  company: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters.' })
    .max(50, { message: 'Company name must not be longer than 50 characters.' }),
  workEmail: z
    .string()
    .min(1, { message: 'This field is required.' })
    .email('This is not a valid email.'),
  phone: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters.' }),
  goals: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
  recaptchaToken: z
    .string()
    .min(1, { message: 'Please verify that you are human.' })
});

type FormData = z.infer<typeof formSchema>;

export function SplitContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>('New project');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      workEmail: '',
      phone: '',
      goals: '',
      recaptchaToken: ''
    }
  });
  
  // Update form when recaptcha token changes
  useEffect(() => {
    if (recaptchaToken) {
      form.setValue('recaptchaToken', recaptchaToken);
    }
  }, [recaptchaToken, form]);
  
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      interface VerifyResponse {
        success: boolean;
        verified: boolean;
        errors?: string[];
      }
      
      const data = await response.json() as VerifyResponse;
      
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
    setIsLoading(true);
    
    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      
      // Add all form fields to FormData
      formData.append('name', data.name);
      formData.append('company', data.company);
      formData.append('email', data.workEmail);
      formData.append('phone', data.phone);
      formData.append('message', data.goals);
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'website_contact');
      formData.append('formType', selectedOption ?? 'Not specified');
      
      // Add file if present
      if (attachment) {
        formData.append('file', attachment);
        
        // Also add file metadata as separate fields
        formData.append('fileName', attachment.name);
        formData.append('fileSize', attachment.size.toString());
        formData.append('fileType', attachment.type);
      }
      
      // Send the FormData to Zapier
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        // Don't set Content-Type header - browser will set it with boundary
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors',
        body: formData
      });
      
      toast({
        title: 'Success!',
        description: 'Your message has been sent. We\'ll get back to you soon.'
      });
      
      form.reset();
      setSelectedOption(null);
      removeAttachment();
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

  return (
    <>
      <Box className="justify-center gap-[6.06rem]" direction={{ base: 'col', md: 'row' }}>
        <div className="md:w-[33rem] flex-shrink-0">
          <div className="sticky top-[12rem] pt-4">
            <BlurFade 
              inView 
              inViewMargin="-100px" 
              direction="up" 
              useBlur={false}
            >
              <Image
                src={'https://images.ctfassets.net/17izd3p84uup/4sQbls9UNWOmwbDCbw4kpR/019aedbe2bbec027092e257d26518f83/image_753.svg'}
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
          <form onSubmit={form.handleSubmit(onSubmitHandler)} className="md:w-[33.375rem] flex flex-col gap-[2.06rem]">
            <Box className="items-end justify-between">
              <h2 className="">Let&apos;s talk</h2>
              <Link
                href="/contact"
                className="text-base leading-[140%] no-underline transition-all hover:text-text hover:underline"
              >
                Explore careers
              </Link>
            </Box>
            <Box className="gap-[1.44rem]" direction="col">
              <label className="flex items-center gap-[0.69rem]">
                <div className={`relative h-4 w-4 rounded-full border ${selectedOption === 'New project' ? 'bg-[#000227] border-[#000227]' : 'bg-transparent border-[#000227]'} flex items-center justify-center`}> 
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
                <div className={`relative h-4 w-4 rounded-full border ${selectedOption === 'Something else' ? 'bg-[#000227] border-[#000227]' : 'bg-transparent border-[#000227]'} flex items-center justify-center`}> 
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        id="name"
                        label="Name"
                        {...field}
                        className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                        labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                        borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        id="company"
                        label="Company"
                        {...field}
                        className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                        labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                        borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        id="workEmail"
                        label="Work email"
                        type="email"
                        {...field}
                        className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                        labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                        borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        id="phone"
                        label="Phone"
                        type="tel"
                        {...field}
                        className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                        labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                        borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelTextarea
                        id="goals"
                        label="Describe goals"
                        {...field}
                        className="min-h-[100px] w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                        labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                        borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* File Attachment Section */}
              <div>
                {!attachment && (
                  <div className="flex justify-end">
                    <label 
                      htmlFor="file-upload" 
                      className="cursor-pointer text-sm text-text/80 hover:text-text whitespace-normal md:whitespace-nowrap"
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
                
                {/* reCAPTCHA Verification */}
                <FormField
                  control={form.control}
                  name="recaptchaToken"
                  render={(_) => (
                    <FormItem className="mt-4">
                      <FormControl>
                        <RecaptchaCheckbox
                          onVerify={handleRecaptchaVerify}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {attachmentError && (
                  <p className="mt-1 text-xs text-red-500">{attachmentError}</p>
                )}
                
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
                        className="cursor-pointer text-sm text-text/80 hover:text-text whitespace-normal md:whitespace-nowrap"
                      >
                        <span>+ Change attachment</span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </Box>
            <Box className="justify-between">
              <p className="leading-[120%] tracking-[-0.0225rem] text-[0.75rem] w-[11.4375rem]">
                  We&apos;ll never sell or abuse your email. By submitting this form you accept our Terms.
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
