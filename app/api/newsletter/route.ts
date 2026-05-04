import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Reuse the same transporter configuration
const transporter = nodemailer.createTransport({
  host: "c97012.sgvps.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@flichire.com",
    pass: "]f{15kc#rnh8",
  },
});

interface NewsletterSubscription {
  email: string;
}

const generateSubscriptionEmailTemplate = (email: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 20px;
          }
          .content {
            padding: 40px 30px;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://flichire.com/images/logo.png" alt="Flichire Logo" class="logo">
            <h2>New Newsletter Subscription</h2>
          </div>
          <div class="content">
            <p>A new user has subscribed to the newsletter:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div class="footer">
            This is an automated message from your website newsletter subscription form.
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function POST(request: Request) {
  try {
    const body: NewsletterSubscription = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send notification email
    await transporter.sendMail({
      from: "contact@flichire.com",
      to: "shivam@flichire.com",
      subject: "New Newsletter Subscription",
      html: generateSubscriptionEmailTemplate(body.email),
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
