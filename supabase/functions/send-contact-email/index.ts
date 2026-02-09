import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@^3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: "Contact Form <onboarding@accenvix.com>",
      to: ["mohd.albar.mohamed@gmail.com"],
      subject: "Contact Form: " + sanitizedSubject,
      html: "<h2>New Contact Form Submission</h2>" +
            "<p><strong>Name:</strong> " + sanitizedName + "</p>" +
            "<p><strong>Email:</strong> " + escapeHtml(data.email) + "</p>" +
            "<p><strong>Subject:</strong> " + sanitizedSubject + "</p>" +
            "<hr /><h3>Message:</h3><p>" + sanitizedMessage.replace(/\n/g, "<br>") + "</p>",
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Accenvix Solutions <onboarding@accenvix.com>",
      to: [data.email],
      subject: "Thank you for contacting us",
      html: "<h2>Thank you for reaching out!</h2>" +
            "<p>Hi " + sanitizedName + ",</p>" +
            "<p>We've received your message and will get back to you as soon as possible.</p>" +
            "<hr /><p><strong>Your message:</strong></p>" +
            "<p>" + sanitizedMessage.replace(/\n/g, "<br>") + "</p>" +
            "<hr /><p>Best regards,<br>The Accenvix Team</p>",
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