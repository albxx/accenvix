import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@^3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// ============================================
// EMAIL TEMPLATE HELPERS
// ============================================

const EMAIL_STYLES = {
  primaryColor: "#1a1a2e",
  secondaryColor: "#16213e",
  accentColor: "#e94560",
  textColor: "#333333",
  lightTextColor: "#666666",
  backgroundColor: "#f8f9fa",
  white: "#ffffff",
  borderColor: "#e0e0e0",
};

function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TKT-${timestamp}-${random}`;
}

function getEmailHeader(logoUrl?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Confirmation</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${EMAIL_STYLES.backgroundColor};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: ${EMAIL_STYLES.white}; border-collapse: collapse;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, ${EMAIL_STYLES.primaryColor} 0%, ${EMAIL_STYLES.secondaryColor} 100%); padding: 40px 30px; text-align: center;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center;">
              ${logoUrl ? `<img src="${logoUrl}" alt="Accenvix Solutions" width="180" style="display: block; margin: 0 auto; max-width: 180px; height: auto;">` : ''}
              <h1 style="margin: 20px 0 0 0; color: ${EMAIL_STYLES.white}; font-size: 28px; font-weight: 700; letter-spacing: 1px;">ACCENVIX SOLUTIONS</h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Innovating Digital Experiences</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;
}

function getEmailFooter(): string {
  return `
    <!-- Footer -->
    <tr>
      <td style="background-color: ${EMAIL_STYLES.primaryColor}; padding: 30px; text-align: center;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <p style="color: ${EMAIL_STYLES.white}; font-size: 14px; margin: 0 0 10px 0;">Connect with us</p>
              <a href="https://accenvix.com" style="color: ${EMAIL_STYLES.accentColor}; text-decoration: none; font-size: 14px; margin: 0 10px;">Website</a>
              <span style="color: rgba(255,255,255,0.3);">|</span>
              <a href="mailto:info@accenvix.com" style="color: ${EMAIL_STYLES.accentColor}; text-decoration: none; font-size: 14px; margin: 0 10px;">Email</a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 5px 0;">&copy; ${new Date().getFullYear()} Accenvix Solutions. All rights reserved.</p>
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Kuala Lumpur, Malaysia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function getConfirmationEmailBody(
  name: string,
  ticketNumber: string,
  message: string,
  originalSubject: string
): string {
  const messagePreview = message.length > 300 ? message.substring(0, 300) + '...' : message;
  
  return `
    <!-- Main Content -->
    <tr>
      <td style="padding: 40px 40px 20px 40px;">
        <!-- Success Icon -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: ${EMAIL_STYLES.accentColor}; border-radius: 50%; text-align: center; line-height: 80px;">
                <span style="color: ${EMAIL_STYLES.white}; font-size: 36px;">&#10003;</span>
              </div>
            </td>
          </tr>
        </table>

        <!-- Confirmation Message -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <h2 style="margin: 0 0 15px 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 26px; font-weight: 600;">Thank You, ${escapeHtml(name)}!</h2>
              <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 16px; line-height: 1.6;">
                We've received your message and we're excited to connect with you!
              </p>
            </td>
          </tr>
        </table>

        <!-- Ticket Information -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${EMAIL_STYLES.backgroundColor}; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid ${EMAIL_STYLES.borderColor};">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Reference Number</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">${ticketNumber}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Expected Response</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 16px; font-weight: 500;">Within 24-48 business hours</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Message Summary -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding-bottom: 15px;">
              <p style="margin: 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 14px; font-weight: 600;">Your Message Summary</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${EMAIL_STYLES.backgroundColor}; border-radius: 8px; padding: 20px; border-left: 4px solid ${EMAIL_STYLES.accentColor};">
              <p style="margin: 0 0 10px 0; color: ${EMAIL_STYLES.textColor}; font-size: 14px;">
                <strong style="color: ${EMAIL_STYLES.primaryColor};">Subject:</strong> ${escapeHtml(originalSubject)}
              </p>
              <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 14px; line-height: 1.6;">
                ${escapeHtml(messagePreview).replace(/\n/g, '<br>')}
              </p>
            </td>
          </tr>
        </table>

        <!-- What Happens Next -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, ${EMAIL_STYLES.secondaryColor} 0%, ${EMAIL_STYLES.primaryColor} 100%); border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <p style="margin: 0 0 15px 0; color: ${EMAIL_STYLES.white}; font-size: 16px; font-weight: 600;">What Happens Next?</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ${EMAIL_STYLES.accentColor}; color: ${EMAIL_STYLES.white}; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">1</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">Our team reviews your inquiry</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ${EMAIL_STYLES.accentColor}; color: ${EMAIL_STYLES.white}; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">2</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">We'll craft a personalized response</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ${EMAIL_STYLES.accentColor}; color: ${EMAIL_STYLES.white}; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">3</span>
                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">Reach out to schedule a consultation</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Services Highlight -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <p style="margin: 0 0 20px 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 14px; font-weight: 600;">Our Services</p>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.accentColor}; font-size: 20px;">&#9881;</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px;">Web Development</p>
                  </td>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.accentColor}; font-size: 20px;">&#128241;</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px;">Mobile Apps</p>
                  </td>
                  <td style="width: 33.33%; text-align: center; padding: 10px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.accentColor}; font-size: 20px;">&#128202;</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px;">Data Analytics</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Closing -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid ${EMAIL_STYLES.borderColor};">
              <p style="margin: 0 0 10px 0; color: ${EMAIL_STYLES.textColor}; font-size: 16px;">Best regards,</p>
              <p style="margin: 0; color: ${EMAIL_STYLES.accentColor}; font-size: 18px; font-weight: 600;">The Accenvix Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;
}

function getAdminNotificationBody(
  name: string,
  email: string,
  subject: string,
  message: string,
  ticketNumber: string
): string {
  const messageWithBreaks = escapeHtml(message).replace(/\n/g, '<br>');
  
  return `
    <!-- Main Content -->
    <tr>
      <td style="padding: 40px 40px 20px 40px;">
        <!-- Notification Header -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; width: 70px; height: 70px; background-color: ${EMAIL_STYLES.accentColor}; border-radius: 50%; text-align: center; line-height: 70px; margin-bottom: 20px;">
                <span style="color: ${EMAIL_STYLES.white}; font-size: 28px;">&#9993;</span>
              </div>
              <h2 style="margin: 0 0 15px 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 24px; font-weight: 600;">New Contact Form Submission</h2>
              <p style="margin: 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 14px;">Someone has reached out through your website</p>
            </td>
          </tr>
        </table>

        <!-- Ticket Badge -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="text-align: center;">
              <span style="display: inline-block; background-color: ${EMAIL_STYLES.primaryColor}; color: ${EMAIL_STYLES.white}; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; font-family: 'Courier New', monospace;">${ticketNumber}</span>
            </td>
          </tr>
        </table>

        <!-- Contact Details -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${EMAIL_STYLES.backgroundColor}; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px;">
              <p style="margin: 0 0 20px 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 14px; font-weight: 600; border-bottom: 2px solid ${EMAIL_STYLES.accentColor}; padding-bottom: 10px;">Contact Details</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.textColor}; font-size: 16px; font-weight: 500;">${escapeHtml(name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.textColor}; font-size: 16px;"><a href="mailto:${escapeHtml(email)}" style="color: ${EMAIL_STYLES.accentColor}; text-decoration: none;">${escapeHtml(email)}</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 5px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 0; color: ${EMAIL_STYLES.textColor}; font-size: 16px; font-weight: 500;">${escapeHtml(subject)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Message -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-bottom: 15px;">
              <p style="margin: 0; color: ${EMAIL_STYLES.primaryColor}; font-size: 14px; font-weight: 600;">Message</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${EMAIL_STYLES.backgroundColor}; border-radius: 8px; padding: 20px; border-left: 4px solid ${EMAIL_STYLES.accentColor};">
              <p style="margin: 0; color: ${EMAIL_STYLES.textColor}; font-size: 14px; line-height: 1.7;">
                ${messageWithBreaks}
              </p>
            </td>
          </tr>
        </table>

        <!-- Quick Actions -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid ${EMAIL_STYLES.borderColor};">
              <p style="margin: 0 0 15px 0; color: ${EMAIL_STYLES.lightTextColor}; font-size: 12px;">Quick Actions</p>
              <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: ${EMAIL_STYLES.accentColor}; color: ${EMAIL_STYLES.white}; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; margin-right: 10px;">Reply Now</a>
              <a href="https://accenvix.com/admin" style="display: inline-block; background-color: ${EMAIL_STYLES.primaryColor}; color: ${EMAIL_STYLES.white}; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">View in Dashboard</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
`;
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute
const ALLOWED_ORIGINS = [
  "https://accenvix.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Security: HTML entity encoding to prevent XSS
function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "AMP") // temporary
    .replace(/</g, "LT")
    .replace(/>/g, "GT")
    .replace(/"/g, "QUOT")
    .replace(/'/g, "APOS")
    .replace(/\//g, "SLASH")
    .replace(/`/g, "BACKTICK")
    .replace(/=/g, "EQUAL")
    .replace(/AMP/g, "&")
    .replace(/LT/g, "<")
    .replace(/GT/g, ">")
    .replace(/QUOT/g, String.fromCharCode(34))
    .replace(/APOS/g, "&#x27;")
    .replace(/SLASH/g, "&#x2F;")
    .replace(/BACKTICK/g, "&#x60;")
    .replace(/EQUAL/g, "&#x3D;");
}

// Security: Sanitize email headers to prevent injection
function sanitizeHeader(value: string, maxLength: number = 200): string {
  const sanitized = value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/(\r\n|\r|\n)/g, " ")
    .trim()
    .slice(0, maxLength);
  
  return sanitized.replace(/(content-type|mime-version|subject:|to:|cc:|bcc:)/i, "");
}

// Security: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
}

// Security: Validate name format
function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'.()]{1,100}$/;
  return nameRegex.test(name);
}

// Security: Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// Cleanup old rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

serve(async (req: Request) => {
  const clientIP = req.headers.get("x-forwarded-for") || 
                   req.headers.get("x-real-ip") || 
                   "unknown";

  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const origin = req.headers.get("origin") || "";
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || 
                          ALLOWED_ORIGINS.some(allowed => origin.endsWith(allowed));

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-XSS-Protection", "1; mode=block");
  
  if (isAllowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return new Response(
      JSON.stringify({ error: "Invalid content type" }),
      { status: 400, headers }
    );
  }

  try {
    const data: ContactFormData = await req.json();

    // Security: Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        { status: 200, headers }
      );
    }

    // Security: Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers }
      );
    }

    // Security: Validate field lengths
    if (data.name.length > 100 || data.email.length > 100 || 
        data.subject.length > 200 || data.message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "One or more fields exceed maximum length" }),
        { status: 400, headers }
      );
    }

    // Security: Validate email format
    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers }
      );
    }

    // Security: Validate name format
    if (!isValidName(data.name)) {
      return new Response(
        JSON.stringify({ error: "Invalid name format" }),
        { status: 400, headers }
      );
    }

    // Security: Sanitize all user inputs
    const sanitizedName = escapeHtml(data.name);
    const sanitizedSubject = sanitizeHeader(data.subject);
    const sanitizedMessage = escapeHtml(data.message).slice(0, 2000);
    const ticketNumber = generateTicketNumber();

    // Send enhanced admin notification email
    const adminEmailHtml = getEmailHeader() + 
                          getAdminNotificationBody(data.name, data.email, data.subject, data.message, ticketNumber) + 
                          getEmailFooter();
    
    const adminEmail = await resend.emails.send({
      from: "Contact Form <onboarding@accenvix.com>",
      to: ["mohd.albar.mohamed@gmail.com"],
      subject: `New Inquiry [${ticketNumber}]: ${sanitizedSubject}`,
      html: adminEmailHtml,
    });

    // Send professional confirmation email to user
    const userEmailHtml = getEmailHeader() + 
                         getConfirmationEmailBody(data.name, ticketNumber, data.message, data.subject) + 
                         getEmailFooter();
    
    await resend.emails.send({
      from: "Accenvix Solutions <onboarding@accenvix.com>",
      to: [data.email],
      subject: `Message Received - ${ticketNumber}`,
      html: userEmailHtml,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers }
    );
  }
});