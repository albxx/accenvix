import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@^3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// ============================================
// LOCALIZATION DATA
// ============================================

const TRANSLATIONS = {
  en: {
    email: {
      userConfirmation: {
        subject: "Message Received - ",
        thankYou: "Thank You, ",
        messageReceived: "We've received your message and we're excited to connect with you!",
        referenceNumber: "Reference Number",
        expectedResponse: "Expected Response",
        within24Hours: "Within 24-48 business hours",
        yourMessageSummary: "Your Message Summary",
        whatHappensNext: "What Happens Next?",
        step1: "Our team reviews your inquiry",
        step2: "We'll craft a personalized response",
        step3: "Reach out to schedule a consultation",
        ourServices: "Our Services",
        webDevelopment: "Web Development",
        mobileApps: "Mobile Apps",
        dataAnalytics: "Data Analytics",
        bestRegards: "Best regards,",
        theAccenvixTeam: "The Accenvix Team"
      },
      adminNotification: {
        subject: "New Inquiry [",
        newContactSubmission: "New Contact Form Submission",
        someoneContacted: "Someone has reached out through your website",
        contactDetails: "Contact Details",
        name: "Name",
        email: "Email",
        message: "Message",
        quickActions: "Quick Actions",
        replyNow: "Reply Now",
        viewInDashboard: "View in Dashboard"
      },
      footer: {
        connectWithUs: "Connect with us",
        website: "Website",
        email: "Email",
        copyright: "© ",
        allRightsReserved: "All rights reserved.",
        location: "Kuala Lumpur, Malaysia"
      }
    }
  },
  ms: {
    email: {
      userConfirmation: {
        subject: "Mesej Diterima - ",
        thankYou: "Terima Kasih, ",
        messageReceived: "Kami telah menerima mesej anda dan kami teruja untuk berhubung dengan anda!",
        referenceNumber: "Nombor Rujukan",
        expectedResponse: "Jangkaan Respons",
        within24Hours: "Dalam masa 24-48 jam perniagaan",
        yourMessageSummary: "Ringkasan Mesej Anda",
        whatHappensNext: "Apa yang Akan Berlanjut?",
        step1: "Pasukan kami menyemak pertanyaan anda",
        step2: "Kami akan menyediakan respons yang diperibadikan",
        step3: "Hubungi anda untuk menjadualkan rundingan",
        ourServices: "Perkhidmatan Kami",
        webDevelopment: "Pembangunan Web",
        mobileApps: "Aplikasi Mudah Alih",
        dataAnalytics: "Analitik Data",
        bestRegards: "Hormat kami,",
        theAccenvixTeam: "Pasukan Accenvix"
      },
      adminNotification: {
        subject: "Pertanyaan Baru [",
        newContactSubmission: "Borang Hubungan Baru Dihantar",
        someoneContacted: "Seseorang telah menghubungi melalui laman web kami",
        contactDetails: "Butiran Hubungan",
        name: "Nama",
        email: "E-mel",
        message: "Mesej",
        quickActions: "Tindakan Pantas",
        replyNow: "Balas Sekarang",
        viewInDashboard: "Lihat di Papan Pemuka"
      },
      footer: {
        connectWithUs: "Hubungi kami",
        website: "Laman Web",
        email: "E-mel",
        copyright: "© ",
        allRightsReserved: "Hakcipta terpelihara.",
        location: "Kuala Lumpur, Malaysia"
      }
    }
  }
};

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
  return "TKT-" + timestamp + "-" + random;
}

function getEmailHeader(t: any, logoUrl?: string): string {
  return '<!DOCTYPE html>\n<html lang="' + (t.email ? 'en' : 'ms') + '">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Email Confirmation</title>\n</head>\n<body style="margin: 0; padding: 0; font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: ' + EMAIL_STYLES.backgroundColor + ';">\n  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: ' + EMAIL_STYLES.white + '; border-collapse: collapse;">\n    <tr>\n      <td style="background: linear-gradient(135deg, ' + EMAIL_STYLES.primaryColor + ' 0%, ' + EMAIL_STYLES.secondaryColor + ' 100%); padding: 40px 30px; text-align: center;">\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center;">\n              ' + (logoUrl ? '<img src="' + logoUrl + '" alt="Accenvix Solutions" width="180" style="display: block; margin: 0 auto; max-width: 180px; height: auto;">' : '') + '\n              <h1 style="margin: 20px 0 0 0; color: ' + EMAIL_STYLES.white + '; font-size: 28px; font-weight: 700; letter-spacing: 1px;">ACCENVIX SOLUTIONS</h1>\n              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">' + (t.email ? 'Innovating Digital Experiences' : 'Mencipta Pengalaman Digital') + '</p>\n            </td>\n          </tr>\n        </table>\n      </td>\n    </tr>\n';
}

function getEmailFooter(t: any): string {
  return '    <tr>\n      <td style="background-color: ' + EMAIL_STYLES.primaryColor + '; padding: 30px; text-align: center;">\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center; padding-bottom: 20px;">\n              <p style="color: ' + EMAIL_STYLES.white + '; font-size: 14px; margin: 0 0 10px 0;">' + t.footer.connectWithUs + '</p>\n              <a href="https://accenvix.com" style="color: ' + EMAIL_STYLES.accentColor + '; text-decoration: none; font-size: 14px; margin: 0 10px;">' + t.footer.website + '</a>\n              <span style="color: rgba(255,255,255,0.3);">|</span>\n              <a href="mailto:info@accenvix.com" style="color: ' + EMAIL_STYLES.accentColor + '; text-decoration: none; font-size: 14px; margin: 0 10px;">' + t.footer.email + '</a>\n            </td>\n          </tr>\n          <tr>\n            <td style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">\n              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 5px 0;">' + t.footer.copyright + new Date().getFullYear() + ' Accenvix Solutions. ' + t.footer.allRightsReserved + '</p>\n              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">' + t.footer.location + '</p>\n            </td>\n          </tr>\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>\n';
}

function getConfirmationEmailBody(t: any, name: string, ticketNumber: string, message: string, originalSubject: string): string {
  const messagePreview = message.length > 300 ? message.substring(0, 300) + "..." : message;
  
  return '    <tr>\n      <td style="padding: 40px 40px 20px 40px;">\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center; padding-bottom: 30px;">\n              <div style="display: inline-block; width: 80px; height: 80px; background-color: ' + EMAIL_STYLES.accentColor + '; border-radius: 50%; text-align: center; line-height: 80px;">\n                <span style="color: ' + EMAIL_STYLES.white + '; font-size: 36px;">&#10003;</span>\n              </div>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center; padding-bottom: 30px;">\n              <h2 style="margin: 0 0 15px 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 26px; font-weight: 600;">' + t.email.userConfirmation.thankYou + escapeHtml(name) + '!</h2>\n              <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 16px; line-height: 1.6;">\n                ' + t.email.userConfirmation.messageReceived + '\n              </p>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ' + EMAIL_STYLES.backgroundColor + '; border-radius: 12px; margin-bottom: 30px;">\n          <tr>\n            <td style="padding: 25px;">\n              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n                <tr>\n                  <td style="padding-bottom: 15px; border-bottom: 1px solid ' + EMAIL_STYLES.borderColor + ';">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">' + t.email.userConfirmation.referenceNumber + '</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 18px; font-weight: 600; font-family: \'Courier New\', monospace;">' + ticketNumber + '</p>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding-top: 15px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">' + t.email.userConfirmation.expectedResponse + '</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 16px; font-weight: 500;">' + t.email.userConfirmation.within24Hours + '</p>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">\n          <tr>\n            <td style="padding-bottom: 15px;">\n              <p style="margin: 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 14px; font-weight: 600;">' + t.email.userConfirmation.yourMessageSummary + '</p>\n            </td>\n          </tr>\n          <tr>\n            <td style="background-color: ' + EMAIL_STYLES.backgroundColor + '; border-radius: 8px; padding: 20px; border-left: 4px solid ' + EMAIL_STYLES.accentColor + ';">\n              <p style="margin: 0 0 10px 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 14px;">\n                <strong style="color: ' + EMAIL_STYLES.primaryColor + ';">' + t.email.userConfirmation.subject + '</strong> ' + escapeHtml(originalSubject) + '\n              </p>\n              <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 14px; line-height: 1.6;">\n                ' + escapeHtml(messagePreview).replace(/\\n/g, "<br>") + '\n              </p>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, ' + EMAIL_STYLES.secondaryColor + ' 0%, ' + EMAIL_STYLES.primaryColor + ' 100%); border-radius: 12px; margin-bottom: 30px;">\n          <tr>\n            <td style="padding: 25px;">\n              <p style="margin: 0 0 15px 0; color: ' + EMAIL_STYLES.white + '; font-size: 16px; font-weight: 600;">' + t.email.userConfirmation.whatHappensNext + '</p>\n              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n                <tr>\n                  <td style="padding-bottom: 10px;">\n                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ' + EMAIL_STYLES.accentColor + '; color: ' + EMAIL_STYLES.white + '; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">1</span>\n                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">' + t.email.userConfirmation.step1 + '</span>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding-bottom: 10px;">\n                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ' + EMAIL_STYLES.accentColor + '; color: ' + EMAIL_STYLES.white + '; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">2</span>\n                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">' + t.email.userConfirmation.step2 + '</span>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <span style="display: inline-block; width: 24px; height: 24px; background-color: ' + EMAIL_STYLES.accentColor + '; color: ' + EMAIL_STYLES.white + '; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">3</span>\n                    <span style="color: rgba(255,255,255,0.9); font-size: 14px;">' + t.email.userConfirmation.step3 + '</span>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">\n          <tr>\n            <td style="text-align: center; padding-bottom: 20px;">\n              <p style="margin: 0 0 20px 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 14px; font-weight: 600;">' + t.email.userConfirmation.ourServices + '</p>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n                <tr>\n                  <td style="width: 33.33%; text-align: center; padding: 10px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.accentColor + '; font-size: 20px;">&#9881;</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px;">' + t.email.userConfirmation.webDevelopment + '</p>\n                  </td>\n                  <td style="width: 33.33%; text-align: center; padding: 10px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.accentColor + '; font-size: 20px;">&#128241;</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px;">' + t.email.userConfirmation.mobileApps + '</p>\n                  </td>\n                  <td style="width: 33.33%; text-align: center; padding: 10px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.accentColor + '; font-size: 20px;">&#128202;</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px;">' + t.email.userConfirmation.dataAnalytics + '</p>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center; padding-top: 20px; border-top: 1px solid ' + EMAIL_STYLES.borderColor + ';">\n              <p style="margin: 0 0 10px 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 16px;">' + t.email.userConfirmation.bestRegards + '</p>\n              <p style="margin: 0; color: ' + EMAIL_STYLES.accentColor + '; font-size: 18px; font-weight: 600;">' + t.email.userConfirmation.theAccenvixTeam + '</p>\n            </td>\n          </tr>\n        </table>\n      </td>\n    </tr>\n';
}

function getAdminNotificationBody(t: any, name: string, email: string, subject: string, message: string, ticketNumber: string): string {
  const messageWithBreaks = escapeHtml(message).replace(/\\n/g, "<br>");
  
  return '    <tr>\n      <td style="padding: 40px 40px 20px 40px;">\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="text-align: center; padding-bottom: 30px;">\n              <div style="display: inline-block; width: 70px; height: 70px; background-color: ' + EMAIL_STYLES.accentColor + '; border-radius: 50%; text-align: center; line-height: 70px; margin-bottom: 20px;">\n                <span style="color: ' + EMAIL_STYLES.white + '; font-size: 28px;">&#9993;</span>\n              </div>\n              <h2 style="margin: 0 0 15px 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 24px; font-weight: 600;">' + t.email.adminNotification.newContactSubmission + '</h2>\n              <p style="margin: 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 14px;">' + t.email.adminNotification.someoneContacted + '</p>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">\n          <tr>\n            <td style="text-align: center;">\n              <span style="display: inline-block; background-color: ' + EMAIL_STYLES.primaryColor + '; color: ' + EMAIL_STYLES.white + '; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; font-family: \'Courier New\', monospace;">' + ticketNumber + '</span>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ' + EMAIL_STYLES.backgroundColor + '; border-radius: 12px; margin-bottom: 30px;">\n          <tr>\n            <td style="padding: 25px;">\n              <p style="margin: 0 0 20px 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 14px; font-weight: 600; border-bottom: 2px solid ' + EMAIL_STYLES.accentColor + '; padding-bottom: 10px;">' + t.email.adminNotification.contactDetails + '</p>\n              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n                <tr>\n                  <td style="padding-bottom: 12px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">' + t.email.adminNotification.name + '</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 16px; font-weight: 500;">' + escapeHtml(name) + '</p>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding-bottom: 12px;">\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">' + t.email.adminNotification.email + '</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 16px;"><a href="mailto:' + escapeHtml(email) + '" style="color: ' + EMAIL_STYLES.accentColor + '; text-decoration: none;">' + escapeHtml(email) + '</a></p>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <p style="margin: 0 0 5px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">' + t.email.adminNotification.subject + '</p>\n                    <p style="margin: 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 16px; font-weight: 500;">' + escapeHtml(subject) + '</p>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">\n          <tr>\n            <td style="padding-bottom: 15px;">\n              <p style="margin: 0; color: ' + EMAIL_STYLES.primaryColor + '; font-size: 14px; font-weight: 600;">' + t.email.adminNotification.message + '</p>\n            </td>\n          </tr>\n          <tr>\n            <td style="background-color: ' + EMAIL_STYLES.backgroundColor + '; border-radius: 8px; padding: 20px; border-left: 4px solid ' + EMAIL_STYLES.accentColor + ';">\n              <p style="margin: 0; color: ' + EMAIL_STYLES.textColor + '; font-size: 14px; line-height: 1.7;">\n                ' + messageWithBreaks + '\n              </p>\n            </td>\n          </tr>\n        </table>\n        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 30px;">\n          <tr>\n            <td style="text-align: center; padding-top: 20px; border-top: 1px solid ' + EMAIL_STYLES.borderColor + ';">\n              <p style="margin: 0 0 15px 0; color: ' + EMAIL_STYLES.lightTextColor + '; font-size: 12px;">' + t.email.adminNotification.quickActions + '</p>\n              <a href="mailto:' + escapeHtml(email) + '?subject=Re: ' + encodeURIComponent(subject) + '" style="display: inline-block; background-color: ' + EMAIL_STYLES.accentColor + '; color: ' + EMAIL_STYLES.white + '; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; margin-right: 10px;">' + t.email.adminNotification.replyNow + '</a>\n              <a href="https://accenvix.com/admin" style="display: inline-block; background-color: ' + EMAIL_STYLES.primaryColor + '; color: ' + EMAIL_STYLES.white + '; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">' + t.email.adminNotification.viewInDashboard + '</a>\n            </td>\n          </tr>\n        </table>\n      </td>\n    </tr>\n';
}

// Rate limiting store
var rateLimitStore = new Map();
var RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
var MAX_REQUESTS_PER_WINDOW = 3;
var ALLOWED_ORIGINS = [
  "https://www.accenvix.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  lang?: string;
}

// Security: HTML entity encoding to prevent XSS
function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&#38;")
    .replace(/</g, "&#60;")
    .replace(/>/g, "&#62;")
    .replace(/"/g, "&#34;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#47;")
    .replace(/`/g, "&#96;")
    .replace(/=/g, "&#61;");
}

// Security: Sanitize email headers to prevent injection
function sanitizeHeader(value: string, maxLength: number = 200): string {
  var sanitized = value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/(\r\n|\r|\n)/g, " ")
    .trim()
    .slice(0, maxLength);
  
  return sanitized.replace(/(content-type|mime-version|subject:|to:|cc:|bcc:)/i, "");
}

// Security: Validate email format
function isValidEmail(email: string): boolean {
  var emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
}

// Security: Validate name format
function isValidName(name: string): boolean {
  var nameRegex = /^[a-zA-Z\s\-'.()]{1,100}$/;
  return nameRegex.test(name);
}

// Security: Check rate limit
function checkRateLimit(ip: string): boolean {
  var now = Date.now();
  var record = rateLimitStore.get(ip);

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
setInterval(function() {
  var now = Date.now();
  for (var entry of rateLimitStore.entries()) {
    var ip = entry[0];
    var record = entry[1];
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

serve(async function(req: Request) {
  var clientIP = req.headers.get("x-forwarded-for") || 
                 req.headers.get("x-real-ip") || 
                 "unknown";

  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  var origin = req.headers.get("origin") || "";
  var isAllowedOrigin = ALLOWED_ORIGINS.indexOf(origin) >= 0 || 
                        ALLOWED_ORIGINS.some(function(allowed) { return origin.endsWith(allowed); });

  var headers = new Headers();
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
    return new Response("ok", { headers: headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: headers }
    );
  }

  var contentType = req.headers.get("content-type");
  if (!contentType || contentType.indexOf("application/json") < 0) {
    return new Response(
      JSON.stringify({ error: "Invalid content type" }),
      { status: 400, headers: headers }
    );
  }

  try {
    var data = await req.json();

    // Security: Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        { status: 200, headers: headers }
      );
    }

    // Security: Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: headers }
      );
    }

    // Security: Validate field lengths
    if (data.name.length > 100 || data.email.length > 100 || 
        data.subject.length > 200 || data.message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "One or more fields exceed maximum length" }),
        { status: 400, headers: headers }
      );
    }

    // Security: Validate email format
    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: headers }
      );
    }

    // Security: Validate name format
    if (!isValidName(data.name)) {
      return new Response(
        JSON.stringify({ error: "Invalid name format" }),
        { status: 400, headers: headers }
      );
    }

    // Security: Sanitize all user inputs
    var sanitizedName = escapeHtml(data.name);
    var sanitizedSubject = sanitizeHeader(data.subject);
    var sanitizedMessage = escapeHtml(data.message).slice(0, 2000);
    var ticketNumber = generateTicketNumber();

    // Determine language - default to English
    const lang = (data.lang && (data.lang === 'en' || data.lang === 'ms')) ? data.lang : 'en';
    const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];

    // Send localized admin notification email
    var adminEmailHtml = getEmailHeader(t) + 
                         getAdminNotificationBody(t, data.name, data.email, data.subject, data.message, ticketNumber) + 
                         getEmailFooter(t);
    
    var adminEmailResult = await resend.emails.send({
      from: "Accenvix Solutions Contact Form <onboarding@accenvix.com>",
      to: ["hello@accenvix.com"],
      cc: ["mohd.albar.mohamed@gmail.com"],
      subject: t.email.adminNotification.subject + ticketNumber + "]: " + sanitizedSubject,
      html: adminEmailHtml,
    });

    // Log admin email result for debugging
    if (adminEmailResult.error) {
      console.error("Admin email failed:", adminEmailResult.error);
    }

    // Send localized professional confirmation email to user
    var userEmailHtml = getEmailHeader(t) + 
                        getConfirmationEmailBody(t, data.name, ticketNumber, data.message, data.subject) + 
                        getEmailFooter(t);
    
    var userEmailResult = await resend.emails.send({
      from: "Accenvix Solutions <onboarding@accenvix.com>",
      to: [data.email],
      subject: t.email.userConfirmation.subject + ticketNumber,
      html: userEmailHtml,
    });

    // Log user email result for debugging
    if (userEmailResult.error) {
      console.error("User confirmation email failed:", userEmailResult.error);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully", lang: lang }),
      { status: 200, headers: headers }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers: headers }
    );
  }
});