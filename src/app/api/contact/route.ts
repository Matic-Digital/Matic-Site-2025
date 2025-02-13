import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { emailConfig } from '@/config/email';

// Define the type for ContactFormData
type ContactFormData = z.infer<typeof contactSchema>;

// Reuse the same schema from the form components
const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: z
    .string()
    .max(50, 'Last name cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  company: z
    .string()
    .optional()
    .or(z.literal('')),
  services: z
    .string()
    .optional()
    .or(z.literal('')),
  budget: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message cannot exceed 1000 characters'),
  formTitle: z
    .string()
    .optional()
    .or(z.literal('')),
});

export async function GET() {
  console.log(' GET /api/contact hit');
  return NextResponse.json({ message: 'Contact API is working' });
}

export async function POST(request: Request) {
  try {
    console.log(' Contact API route hit');
  
    console.log(' Parsing request body...');
    const data = await request.json() as {
      firstName: string;
      lastName?: string;
      email: string;
      company?: string;
      services?: string;
      budget?: string;
      message: string;
      formTitle?: string;
    };
    console.log(' Received form data:', data);

    console.log(' Validating data with Zod...');
    const validatedData: ContactFormData = contactSchema.parse(data);
    console.log(' Data validation successful:', validatedData);

    // Send to webhook
    try {
      console.log(' Sending data to webhook...');
      const webhookResponse = await fetch('https://hook.us2.make.com/m2gyd4chusq4a7i2554i32jj1wfkxja5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!webhookResponse.ok) {
        console.error(' Webhook request failed:', webhookResponse.status);
        throw new Error('Failed to send data to webhook');
      }

      console.log(' Webhook request successful');
    } catch (error) {
      console.error(' Webhook error:', error);
      // Continue with email sending even if webhook fails
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      ...emailConfig.smtp
    });

    const formTitle = validatedData.formTitle ?? 'Get in Touch';

    console.log(' Form submission received:', {
      ...validatedData,
      formTitle
    });

    // Send email
    console.log(' Sending email...');
    const info = await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `New ${formTitle} Form Submission`,
      text: `
        Name: ${validatedData.firstName} ${validatedData.lastName ?? ''}
        Email: ${validatedData.email}
        ${validatedData.company ? `Company: ${validatedData.company}` : ''}
        ${validatedData.services ? `Services: ${validatedData.services}` : ''}
        ${validatedData.budget ? `Budget: ${validatedData.budget}` : ''}
        Message: ${validatedData.message}
        Form: ${formTitle}
      `,
      html: `
        <h2>New ${formTitle} Form Submission</h2>
        <p><strong>Form:</strong> ${formTitle}</p>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName ?? ''}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
        ${validatedData.services ? `<p><strong>Services:</strong> ${validatedData.services}</p>` : ''}
        ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
        <p><strong>Message:</strong> ${validatedData.message}</p>
      `
    });

    console.log(' Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    // Type assertion for the error object
    const err = error as { 
      name?: string;
      message?: string;
      code?: string;
      command?: string;
      stack?: string;
    };
    
    console.error(' Contact API error:', {
      name: err.name,
      message: err.message ?? 'An unknown error occurred',
      code: err.code,
      command: err.command,
      stack: err.stack
    });

    return NextResponse.json(
      { message: err.message ?? 'Failed to send message' },
      { status: 500 }
    );
  }
}
