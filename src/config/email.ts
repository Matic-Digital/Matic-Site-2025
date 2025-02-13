interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
    secure: boolean;
    tls: {
      rejectUnauthorized: boolean;
    };
  };
  from: string;
  to: string;
}

export const emailConfig: EmailConfig = {
  smtp: {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SMTP_USER ?? '',
      pass: process.env.SMTP_PASS?.replace(/\s+/g, '') ?? ''
    },
    secure: true, // use TLS
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  },
  from: process.env.EMAIL_FROM ?? 'your-email@example.com',
  to: process.env.EMAIL_TO ?? process.env.EMAIL_FROM ?? 'recipient@example.com'
};
