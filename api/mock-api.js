import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for Namecheap SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.namecheap.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'your-email@accenvix.com',
      pass: process.env.SMTP_PASS || 'your-email-password',
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    }
  });
};

// Mock send-email endpoint with actual email sending
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message, honeypot, lang } = req.body;

  // Security: Honeypot check
  if (honeypot && honeypot.length > 0) {
    return res.json({ success: true, message: "Message received" });
  }

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Security: Validate field lengths
  if (name.length > 100 || email.length > 100 || 
      subject.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: "One or more fields exceed maximum length" });
  }

  // Security: Validate email format
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Security: Validate name format
  const nameRegex = /^[a-zA-Z\s\-'.()]{1,100}$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }

  try {
    // Create transporter
    const transporter = createTransporter();
    
    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'hello@accenvix.com',
      to: process.env.TO_EMAIL || 'hello@accenvix.com',
      subject: `[Contact Form] ${subject}`,
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on accenvix.com
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #fafafa; padding: 15px; border-left: 4px solid #007cba; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the contact form on accenvix.com
          </p>
        </div>
      `
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'hello@accenvix.com',
      to: email,
      subject: `Thank you for contacting Accenvix Solutions`,
      text: `
Thank you for your message, ${name}!

We've received your inquiry and will get back to you within 24-48 business hours.

Your message summary:
Subject: ${subject}
Message: ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}

Best regards,
The Accenvix Solutions Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Thank You, ${name}!</h2>
          <p>We've received your message and will get back to you within 24-48 business hours.</p>
          
          <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
          </div>
          
          <p>Best regards,<br>
          <strong>The Accenvix Solutions Team</strong></p>
        </div>
      `
    });

    console.log('Emails sent successfully');
    
    // Return success response
    res.json({ 
      success: true, 
      message: "Message sent successfully", 
      lang: lang || 'en' 
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ 
      error: "Failed to send message. Please try again later.",
      success: false 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// 404 handler - corrected syntax
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log('SMTP Configuration:');
  console.log('- Host:', process.env.SMTP_HOST || 'smtp.namecheap.com');
  console.log('- Port:', process.env.SMTP_PORT || '587');
  console.log('- User:', process.env.SMTP_USER || 'your-email@accenvix.com');
});

export default app;
