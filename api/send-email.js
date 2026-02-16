import nodemailer from 'nodemailer';

export default async function handler(request, response) {
  // Enable CORS for preflight requests
  const origin = request.headers.origin || '';
  const allowedOrigins = [
    'https://www.accenvix.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  
  const isAllowedOrigin = allowedOrigins.includes(origin) || 
                          allowedOrigins.some(allowed => origin.endsWith(allowed));

  // Set CORS headers
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-XSS-Protection', '1; mode=block');
  
  if (isAllowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).json({ message: 'OK' });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Check content type
  const contentType = request.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return response.status(400).json({ error: 'Invalid content type' });
  }

  try {
    const data = request.body;

    // Security: Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return response.status(200).json({ success: true, message: 'Message received' });
    }

    // Security: Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return response.status(400).json({ error: 'All fields are required' });
    }

    // Security: Validate field lengths
    if (data.name.length > 100 || data.email.length > 100 || 
        data.subject.length > 200 || data.message.length > 2000) {
      return response.status(400).json({ error: 'One or more fields exceed maximum length' });
    }

    // Security: Validate email format (simple validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email) || data.email.length > 100) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Security: Validate name format (simple validation)
    const nameRegex = /^[a-zA-Z\s\-'.()]+$/;
    if (!nameRegex.test(data.name) || data.name.length > 100) {
      return response.status(400).json({ error: 'Invalid name format' });
    }

    // Get environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL
    } = process.env;

    // Validate required environment variables
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      console.error('Missing SMTP environment variables');
      return response.status(500).json({ 
        error: 'Email configuration error. Please contact administrator.' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates (adjust as needed)
      }
    });

    // Verify connection configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return response.status(500).json({ 
        error: 'Failed to connect to email server. Please try again later.' 
      });
    }

    // Generate ticket number
    const generateTicketNumber = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `TKT-${timestamp}-${random}`;
    };

    const ticketNumber = generateTicketNumber();
    const lang = (data.lang && (data.lang === 'en' || data.lang === 'ms')) ? data.lang : 'en';

    // Email templates
    const getEmailHeader = (isMalay = false) => `
<!DOCTYPE html>
<html lang="${isMalay ? 'ms' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isMalay ? 'Pengesahan E-mel' : 'Email Confirmation'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
    <tr>
      <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center;">
              <h1 style="margin: 20px 0 0 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">ACCENVIX SOLUTIONS</h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">${isMalay ? 'Mencipta Pengalaman Digital' : 'Innovating Digital Experiences'}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;

    const getEmailFooter = (isMalay = false) => `
    <tr>
      <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px 0;">${isMalay ? 'Hubungi kami' : 'Connect with us'}</p>
              <a href="https://accenvix.com" style="color: #e94560; text-decoration: none; font-size: 14px; margin: 0 10px;">${isMalay ? 'Laman Web' : 'Website'}</a>
              <span style="color: rgba(255,255,255,0.3);">|</span>
              <a href="mailto:info@accenvix.com" style="color: #e94560; text-decoration: none; font-size: 14px; margin: 0 10px;">${isMalay ? 'E-mel' : 'Email'}</a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 5px 0;">© ${new Date().getFullYear()} Accenvix Solutions. ${isMalay ? 'Hakcipta terpelihara.' : 'All rights reserved.'}</p>
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">${isMalay ? 'Kuala Lumpur, Malaysia' : 'Kuala Lumpur, Malaysia'}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const getAdminNotificationBody = (name, email, subject, message, ticketNumber, isMalay = false) => {
      const messageWithBreaks = message.replace(/\n/g, "<br>");
      
      return `
    <tr>
      <td style="padding: 40px 40px 20px 40px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; width: 70px; height: 70px; background-color: #e94560; border-radius: 50%; text-align: center; line-height: 70px; margin-bottom: 20px;">
                <span style="color: #ffffff; font-size: 28px;">&#9993;</span>
              </div>
              <h2 style="margin: 0 0 15px 0; color: #1a1a2e; font-size: 24px; font-weight: 600;">${isMalay ? 'Borang Hubungan Baru Dihantar' : 'New Contact Form Submission'}</h2>
              <p style="margin: 0; color: #666666; font-size: 14px;">${isMalay ? 'Seseorang telah menghubungi melalui laman web kami' : 'Someone has reached out through your website'}</p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="text-align: center;">
              <span style="display: inline-block; background-color: #1a1a2e; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; font-family: 'Courier New', monospace;">${ticketNumber}</span>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <p style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 14px; font-weight: 600; border-bottom: 2px solid #e94560; padding-bottom: 10px;">${isMalay ? 'Butiran Hubungan' : 'Contact Details'}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isMalay ? 'Nama' : 'Name'}</p>
                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isMalay ? 'E-mel' : 'Email'}</p>
                    <p style="margin: 0; color: #333333; font-size: 16px;"><a href="mailto:${email}" style="color: #e94560; text-decoration: none;">${email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isMalay ? 'Subjek' : 'Subject'}</p>
                    <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${subject}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-bottom: 15px;">
              <p style="margin: 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${isMalay ? 'Mesej' : 'Message'}</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #e94560;">
              <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.7;">
                ${messageWithBreaks}
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 15px 0; color: #666666; font-size: 12px;">${isMalay ? 'Tindakan Pantas' : 'Quick Actions'}</p>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #e94560; color: #ffffff; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; margin-right: 10px;">${isMalay ? 'Balas Sekarang' : 'Reply Now'}</a>
              <a href="https://accenvix.com/admin" style="display: inline-block; background-color: #1a1a2e; color: #ffffff; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">${isMalay ? 'Lihat di Papan Pemuka' : 'View in Dashboard'}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;
    };

    const getConfirmationEmailBody = (name, ticketNumber, message, originalSubject, isMalay = false) => {
      const messagePreview = message.length > 300 ? message.substring(0, 300) + "..." : message;
      const messageWithBreaks = messagePreview.replace(/\n/g, "<br>");
      
      return `
    <tr>
      <td style="padding: 40px 40px 20px 40px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: #e94560; border-radius: 50%; text-align: center; line-height: 80px;">
                <span style="color: #ffffff; font-size: 36px;">&#10003;</span>
              </div>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1a1a2e; font-size: 26px; font-weight: 600;">${isMalay ? 'Terima Kasih, ' : 'Thank You, '}${name}!</h2>
              <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">
                ${isMalay ? 'Kami telah menerima mesej anda dan kami teruja untuk berhubung dengan anda!' : 'We\'ve received your message and we\'re excited to connect with you!'}
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid #e0e0e0;">
                    <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isMalay ? 'Nombor Rujukan' : 'Reference Number'}</p>
                    <p style="margin: 0; color: #1a1a2e; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">${ticketNumber}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isMalay ? 'Jangkaan Respons' : 'Expected Response'}</p>
                    <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 500;">${isMalay ? 'Dalam masa 24-48 jam perniagaan' : 'Within 24-48 business hours'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding-bottom: 15px;">
              <p style="margin: 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${isMalay ? 'Ringkasan Mesej Anda' : 'Your Message Summary'}</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #e94560;">
              <p style="margin: 0 0 10px 0; color: #333333; font-size: 14px;">
                <strong style="color: #1a1a2e;">${isMalay ? 'Subjek: ' : 'Subject: '}</strong> ${originalSubject}
              </p>
              <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                ${messageWithBreaks}
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #16213e 0%, #1a1a2e 100%); border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-weight: 600;">${isMalay ? 'Apa yang Akan Berlanjut?' : 'What Happens Next?'}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #e94560; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">1</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">${isMalay ? 'Pasukan kami menyemak pertanyaan anda' : 'Our team reviews your inquiry'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #e94560; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">2</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">${isMalay ? 'Kami akan menyediakan respons yang diperibadikan' : 'We\'ll craft a personalized response'}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #e94560; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">3</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">${isMalay ? 'Hubungi anda untuk menjadualkan rundingan' : 'Reach out to schedule a consultation'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <p style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${isMalay ? 'Perkhidmatan Kami' : 'Our Services'}</p>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: #e94560; font-size: 20px;">&#9881;</p>
                    <p style="margin: 0; color: #666666; font-size: 12px;">${isMalay ? 'Pembangunan Web' : 'Web Development'}</p>
                  </td>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: #e94560; font-size: 20px;">&#128241;</p>
                    <p style="margin: 0; color: #666666; font-size: 12px;">${isMalay ? 'Aplikasi Mudah Alih' : 'Mobile Apps'}</p>
                  </td>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: #e94560; font-size: 20px;">&#128202;</p>
                    <p style="margin: 0; color: #666666; font-size: 12px;">${isMalay ? 'Analitik Data' : 'Data Analytics'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px;">${isMalay ? 'Hormat kami,' : 'Best regards,'}</p>
              <p style="margin: 0; color: #e94560; font-size: 18px; font-weight: 600;">${isMalay ? 'Pasukan Accenvix' : 'The Accenvix Team'}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;
    };

    // Send admin notification email
    const adminEmailHtml = getEmailHeader(false) + 
                          getAdminNotificationBody(data.name, data.email, data.subject, data.message, ticketNumber, false) + 
                          getEmailFooter(false);
    
    await transporter.sendMail({
      from: `"Accenvix Solutions Contact Form" <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `${lang === 'ms' ? 'Pertanyaan Baru [' : 'New Inquiry ['}${ticketNumber}]: ${data.subject}`,
      html: adminEmailHtml,
    });

    // Send user confirmation email
    const userConfirmationHtml = getEmailHeader(lang === 'ms') + 
                                getConfirmationEmailBody(data.name, ticketNumber, data.message, data.subject, lang === 'ms') + 
                                getEmailFooter(lang === 'ms');
    
    await transporter.sendMail({
      from: `"Accenvix Solutions" <${SMTP_USER}>`,
      to: data.email,
      subject: `${lang === 'ms' ? 'Mesej Diterima - ' : 'Message Received - '}${ticketNumber}`,
      html: userConfirmationHtml,
    });

    return response.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      lang: lang 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
}