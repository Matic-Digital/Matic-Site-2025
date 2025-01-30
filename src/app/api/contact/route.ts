import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { emailConfig } from '@/config/email';

// Define the type for ContactFormData
type ContactFormData = z.infer<typeof contactSchema>;

// Test email function
async function testEmailConfig() {
  console.log('🧪 Testing email configuration...');
  
  try {
    const transporter = nodemailer.createTransport({
      ...emailConfig.smtp,
      debug: true,
      logger: true
    });

    console.log('📧 Test email config:', {
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      user: emailConfig.smtp.auth.user,
      from: emailConfig.from,
      to: emailConfig.to
    });

    console.log('🔍 Verifying connection...');
    const verification = await transporter.verify();
    console.log('✅ Connection verified:', verification);

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: 'Test Email from Contact Form',
      text: 'This is a test email to verify the SMTP configuration.',
      html: '<p>This is a test email to verify the SMTP configuration.</p>'
    });

    console.log('✅ Test email sent:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return true;
  } catch (error) {
    // Type assertion for the error object
    const err = error as { 
      name?: string;
      message?: string;
      code?: string;
      command?: string;
      stack?: string;
    };
    
    console.error('❌ Test email failed:', {
      name: err.name,
      message: err.message,
      code: err.code,
      command: err.command,
      stack: err.stack
    });
    return false;
  }
}

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
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message cannot exceed 1000 characters'),
  formTitle: z
    .string()
    .min(1, 'Form title is required')
});

export async function GET() {
  console.log('🟢 GET /api/contact hit');
  return NextResponse.json({ message: 'Contact API is working' });
}

export async function POST(request: Request) {
  try {
    console.log('🟢 Contact API route hit');
  
    // First test the email configuration
    const emailConfigWorking = await testEmailConfig();
    if (!emailConfigWorking) {
      console.error('❌ Email configuration test failed');
      return NextResponse.json(
        { message: 'Email system is not properly configured' },
        { status: 500 }
      );
    }
  
    console.log('📥 Parsing request body...');
    const data = await request.json() as {
      firstName: string;
      lastName?: string;
      email: string;
      message: string;
      formTitle: string;
    };
    console.log('📦 Received form data:', data);

    console.log('✅ Validating data with Zod...');
    const validatedData: ContactFormData = contactSchema.parse(data);
    console.log('✨ Data validation successful:', validatedData);
      
    console.log('📧 Loading email config...');
    // Log email configuration (without sensitive data)
    console.log('⚙️ Email config:', {
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      user: emailConfig.smtp.auth.user,
      from: emailConfig.from,
      to: emailConfig.to,
      secure: emailConfig.smtp.secure
    });

    // Create email transporter with debug logging
    console.log('🔄 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      ...emailConfig.smtp,
      debug: true,
      logger: true
    });

    // Verify SMTP connection
    try {
      console.log('🔍 Verifying SMTP connection...');
      const verification = await transporter.verify();
      console.log('✅ SMTP connection verified:', verification);
    } catch (error) {
      // Type assertion for the error object
      const err = error as { 
        name?: string;
        message?: string;
        code?: string;
        command?: string;
        stack?: string;
      };
      
      console.error('❌ SMTP verification failed:', {
        name: err.name,
        message: err.message,
        code: err.code,
        command: err.command,
        stack: err.stack
      });
      throw error;
    }

    // Send to webhook
    try {
      console.log('🔄 Sending data to webhook...');
      const webhookResponse = await fetch('https://hook.us2.make.com/m2gyd4chusq4a7i2554i32jj1wfkxja5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!webhookResponse.ok) {
        console.error('❌ Webhook request failed:', webhookResponse.status);
        throw new Error('Failed to send data to webhook');
      }

      console.log('✅ Webhook request successful');
    } catch (error) {
      console.error('❌ Webhook error:', error);
      // Continue with email sending even if webhook fails
    }

    // Send email
    console.log('📨 Sending email...');
    const info = await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `New Contact Form Submission: ${validatedData.formTitle}`,
      text: `
        Name: ${validatedData.firstName} ${validatedData.lastName ?? ''}
        Email: ${validatedData.email}
        Message: ${validatedData.message}
        Form: ${validatedData.formTitle}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Form:</strong> ${validatedData.formTitle}</p>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName ?? ''}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `
    });

    console.log('✅ Email sent successfully:', {
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
    
    console.error('❌ Contact API error:', {
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
