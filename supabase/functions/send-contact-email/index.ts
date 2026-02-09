import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "jsr:@resend/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req: Request) => {
  // Enable CORS
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  // Verify authorization (optional for public contact form)
  // For extra security, you can validate JWT token here if needed
  // For public contact form, we'll allow unauthenticated requests
  const authHeader = req.headers.get("Authorization");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  // If Authorization header is provided, validate the JWT
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    try {
      // Validate JWT with Supabase
      const jwtValidationResponse = await fetch(
        `${supabaseUrl}/auth/v1/token/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({ token }),
        }
      );
      
      if (!jwtValidationResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Invalid authorization token" }),
          { status: 401, headers }
        );
      }
    } catch (error) {
      console.error("JWT validation error:", error);
      // Continue anyway - public endpoint allows unauthenticated access
    }
  }

  try {
    const data: ContactFormData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers }
      );
    }

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["mohd.albar.mohamed@gmail.com"],
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Accenvix Solutions <onboarding@resend.dev>",
      to: [data.email],
      subject: "Thank you for contacting us",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
        <hr />
        <p>Best regards,<br>The Accenvix Team</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, data: adminEmail }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers }
    );
  }
});