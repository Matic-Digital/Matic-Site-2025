'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Box } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const studioFormSchema = z.object({
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  budget: z.string().min(1, 'Budget is required'),
  message: z.string().optional(),
});

type StudioFormData = z.infer<typeof studioFormSchema>;

interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface FormFieldProps {
  label: string;
  name: keyof StudioFormData;
  placeholder?: string;
  component?: 'input' | 'textarea' | 'select' | 'checkbox';
  register: ReturnType<typeof useForm<StudioFormData>>['register'];
  setValue: ReturnType<typeof useForm<StudioFormData>>['setValue'];
  watch: ReturnType<typeof useForm<StudioFormData>>['watch'];
  errors: ReturnType<typeof useForm<StudioFormData>>['formState']['errors'];
}

function FormField({ 
  label,
  name,
  placeholder = '',
  component = 'input',
  register,
  setValue,
  watch,
  errors,
}: FormFieldProps) {
  const errorMessage = errors[name]?.message;

  if (component === 'checkbox') {
    const services = [
      'UI/UX Design',
      'Website',
      'Branding Identity',
      'Content Creation',
      'Illustration',
      'Other'
    ];

    const selectedServices = watch('services') || [];

    const handleServiceToggle = (service: string) => {
      const currentServices = [...selectedServices];
      const serviceIndex = currentServices.indexOf(service);

      if (serviceIndex > -1) {
        currentServices.splice(serviceIndex, 1);
      } else {
        currentServices.push(service);
      }

      setValue('services', currentServices, { shouldValidate: true });
    };

    return (
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => handleServiceToggle(service)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
              selectedServices.includes(service)
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {selectedServices.includes(service) && <Check className="h-4 w-4" />}
            {service}
          </button>
        ))}
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }

  if (component === 'select') {
    const budgetRanges = [
      'Select a budget range',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000 - $50,000',
      '$50,000+'
    ];

    return (
      <div className="space-y-2">
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
        <div className="relative">
          <select
            {...register(name)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range === 'Select a budget range' ? '' : range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }

  if (component === 'textarea') {
    return (
      <div className="space-y-2">
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none"
          rows={4}
        />
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none"
      />
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export function StudioForm() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StudioFormData>({
    resolver: zodResolver(studioFormSchema),
    defaultValues: {
      services: [],
      name: '',
      email: '',
      company: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (data: StudioFormData) => {
    setFormState({ isLoading: true, error: null, success: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formTitle: 'Studio Form',
          services: data.services.join(', '),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormState({ isLoading: false, error: null, success: true });
      toast({
        title: 'Success!',
        description: 'Thanks for your message! We&apos;ll be in touch soon.',
      });
    } catch (error) {
      console.error(error);
      setFormState({
        isLoading: false,
        error: 'Failed to submit form. Please try again.',
        success: false,
      });
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const { isLoading } = formState;

  return (
    <Box className="min-w-[500px] max-w-[500px] p-8 shadow-[0_3.33px_20px_0_rgba(0,0,0,0.06)] rounded-lg bg-white relative z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <h2 className="text-2xl font-bold mb-6">Let&apos;s get started</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2">I&apos;m interested in</p>
            <FormField
              label=""
              name="services"
              component="checkbox"
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
          <FormField
            label="Name *"
            name="name"
            placeholder="Your name"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <FormField
            label="Email *"
            name="email"
            placeholder="Your email"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <FormField
            label="Company *"
            name="company"
            placeholder="Your company"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <FormField
            label="Monthly Budget *"
            name="budget"
            component="select"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <FormField
            label="Additional details"
            name="message"
            placeholder=""
            component="textarea"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-[#000227] hover:bg-[#000227]/90 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Box>
  );
}