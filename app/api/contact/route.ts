import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: "c97012.sgvps.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@flichire.com",
    pass: "]f{15kc#rnh8",
  },
});

// Email HTML template
const generateEmailTemplate = (data: ContactFormData) => {
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
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .content {
            padding: 40px 30px;
          }
          .field {
            margin-bottom: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .label {
            font-weight: 600;
            color: #4a90e2;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .value {
            font-size: 16px;
            color: #2c3e50;
            line-height: 1.6;
            margin: 0;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #eee;
          }
          .timestamp {
            color: #888;
            font-size: 12px;
            text-align: right;
            margin-top: 20px;
          }
          .logo {
            width: 100px;
            height: auto;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://flichire.com/logo/icon.png" alt="Flichire Logo" class="logo" />
            <h2>New Contact Message</h2>
            <p>You've received a new message from Flichire website contact form</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <p class="value">${data.name}</p>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <p class="value">${data.email}</p>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <p class="value">${data.message}</p>
            </div>
            <div class="timestamp">
              Received on ${new Date().toLocaleString()}
            </div>
          </div>
          <div class="footer">
            This is an automated message from your website contact form.
          </div>
        </div>
      </body>
    </html>
  `;
};

// Define the interface for the contact form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse and type the request body
    const body: ContactFormData = await request.json();

    // Validate the required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add detailed validation logging
    console.log("Received form data:", {
      name: body.name,
      email: body.email,
      message: body.message,
      body: JSON.stringify(body, null, 2),
    });

    // More detailed validation
    const missingFields = [];
    if (!body.name) missingFields.push("name");
    if (!body.email) missingFields.push("email");
    if (!body.message) missingFields.push("message");

    if (missingFields.length > 0) {
      console.log("Validation failed - missing fields:", missingFields);
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log("Invalid email format:", body.email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    console.log(body.name, body.email, body.message);

    // Send email
    await transporter.sendMail({
      from: "contact@flichire.com",
      to: "shivam@flichire.com",
      subject: `New Contact Form Submission: ${body.name}`,
      html: generateEmailTemplate(body),
    });
    console.log("Email sent successfully");

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
