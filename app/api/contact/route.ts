import { NextRequest, NextResponse } from "next/server";

// Supported service categories mapping for subjects
const SERVICE_MAP: Record<string, string> = {
 "web-development": "Web Development",
 "custom-software": "Custom Software",
 "ai-solutions": "AI-Powered Solutions",
 "business-automation": "AI & Business Automation",
 "saas-development": "SaaS Development",
 "application-development": "Application Development",
 "technology-consulting": "Technology & Business Consultancy",
 "digital-transformation": "Offline to Online Transformation",
 "marketplace-development": "Marketplace Development",
 "marketing-growth": "Marketing & Growth",
 "other": "Other (Please specify)"
};

// Simple in-memory cache to prevent basic double-submit spam on the same container instance
const recentSubmissions = new Map<string, number>();
const SPAM_THRESHOLD_MS = 5000; // 5 seconds window per email address

// Basic HTML sanitization function to prevent XSS in email client
function sanitizeHtml(str: string): string {
 return str
 .replace(/&/g, "&amp;")
 .replace(/</g, "&lt;")
 .replace(/>/g, "&gt;")
 .replace(/"/g, "&quot;")
 .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
 try {
 let body;
 try {
 body = await req.json();
 } catch {
 return NextResponse.json(
 { success: false, message: "Invalid payload format." },
 { status: 400 }
 );
 }

 const { name, email, phone, company, service, message, website } = body;

 // 1. Honeypot check (website is visually hidden; if bots fill it out, we silently discard the request)
 if (website && website.trim().length > 0) {
 // Return success status code so bots think their submission was processed successfully
 return NextResponse.json({ success: true });
 }

 // 2. Server-side inputs validation
 if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid name (2 to 100 characters)." },
 { status: 400 }
 );
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid email address." },
 { status: 400 }
 );
 }

 // Phone field validation: optional server-side, but if provided, must match phoneRegex
 const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
 if (phone && phone.trim().length > 0) {
 if (typeof phone !== "string" || !phoneRegex.test(phone.trim())) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid phone number (7 to 18 characters)." },
 { status: 400 }
 );
 }
 }

 if (company && (typeof company !== "string" || company.trim().length > 100)) {
 return NextResponse.json(
 { success: false, message: "Organization name exceeds limit." },
 { status: 400 }
 );
 }

 if (!service || typeof service !== "string" || !SERVICE_MAP[service]) {
 return NextResponse.json(
 { success: false, message: "Please select a valid service category." },
 { status: 400 }
 );
 }

 if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5000) {
 return NextResponse.json(
 { success: false, message: "Please enter your requirements (10 to 5000 characters)." },
 { status: 400 }
 );
 }

 // 3. Rate limiting check (same email address in rapid succession)
 const emailKey = email.trim().toLowerCase();
 const now = Date.now();
 const lastSubmitTime = recentSubmissions.get(emailKey);
 if (lastSubmitTime && now - lastSubmitTime < SPAM_THRESHOLD_MS) {
 return NextResponse.json(
 { success: false, message: "We have received your request. Please wait a moment before trying again." },
 { status: 429 }
 );
 }
 recentSubmissions.set(emailKey, now);

 // Clean up cache to prevent memory leak
 for (const [key, value] of recentSubmissions.entries()) {
 if (now - value > SPAM_THRESHOLD_MS) {
 recentSubmissions.delete(key);
 }
 }

 // 4. Check for configuration status (If RESEND_API_KEY is not defined, return a specific user-friendly error)
 const resendApiKey = process.env.RESEND_API_KEY;
 const toEmail = process.env.CONTACT_TO_EMAIL || "kvyashtechnologies@gmail.com";
 const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

 if (!resendApiKey) {
 console.warn("RESEND_API_KEY environment variable is not configured. Email delivery is disabled.");
 return NextResponse.json(
 { 
 success: false, 
 message: "The email scoping service is not configured yet. Please configure the RESEND_API_KEY environment variable in your deployment environment." 
 },
 { status: 501 } // 501 Not Implemented: represents lack of server config for this action
 );
 }

 // 5. Sanitize values to prevent formatting injection in email clients
 const sanitizedName = sanitizeHtml(name.trim());
 const sanitizedEmail = sanitizeHtml(email.trim());
 const sanitizedPhone = sanitizeHtml(phone.trim());
 const sanitizedCompany = company ? sanitizeHtml(company.trim()) : "N/A";
 const sanitizedMessage = sanitizeHtml(message.trim()).replace(/\n/g, "<br />");
 const serviceLabel = SERVICE_MAP[service];

 const submissionTime = new Date().toISOString();
 const emailSubject = `New KVYASH Technologies Website Enquiry — ${serviceLabel}`;
 
 // HTML Email Body Template
 const htmlBody = `
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <title>KVYASH Technologies Website Enquiry</title>
 <style>
 body {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
 background-color: #f8fafc;
 color: #0f172a;
 margin: 0;
 padding: 24px;
 }
 .container {
 max-width: 600px;
 background-color: #ffffff;
 border: 1px solid #e2e8f0;
 border-radius: 8px;
 padding: 32px;
 margin: 0 auto;
 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
 }
 .header {
 border-bottom: 2px solid #3b82f6;
 padding-bottom: 16px;
 margin-bottom: 24px;
 }
 .logo {
 font-size: 20px;
 font-weight: bold;
 color: #0f172a;
 letter-spacing: 0.5px;
 }
 .title {
 font-size: 16px;
 color: #64748b;
 margin-top: 4px;
 text-transform: uppercase;
 letter-spacing: 1px;
 }
 .section-title {
 font-size: 12px;
 font-weight: bold;
 color: #94a3b8;
 text-transform: uppercase;
 letter-spacing: 1px;
 margin-top: 24px;
 margin-bottom: 12px;
 border-bottom: 1px solid #f1f5f9;
 padding-bottom: 4px;
 }
 .field {
 margin-bottom: 16px;
 }
 .label {
 font-size: 12px;
 font-weight: bold;
 color: #64748b;
 text-transform: uppercase;
 margin-bottom: 4px;
 }
 .value {
 font-size: 14px;
 color: #0f172a;
 line-height: 1.5;
 }
 .message-box {
 background-color: #f8fafc;
 border: 1px solid #e2e8f0;
 border-radius: 6px;
 padding: 16px;
 font-size: 14px;
 color: #334155;
 line-height: 1.6;
 white-space: pre-wrap;
 }
 .footer {
 margin-top: 32px;
 font-size: 12px;
 color: #64748b;
 text-align: center;
 border-top: 1px solid #e2e8f0;
 padding-top: 16px;
 }
 </style>
 </head>
 <body>
 <div class="container">
 <div class="header">
 <div class="logo">KVYASH Technologies</div>
 <div class="title">New Website Enquiry</div>
 </div>
 
 <div class="section-title">Contact Details</div>
 
 <div class="field">
 <div class="label">Full Name:</div>
 <div class="value">${sanitizedName}</div>
 </div>
 
 <div class="field">
 <div class="label">Business Email:</div>
 <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
 </div>

 <div class="field">
 <div class="label">Phone Number:</div>
 <div class="value">${sanitizedPhone}</div>
 </div>
 
 <div class="field">
 <div class="label">Organization:</div>
 <div class="value">${sanitizedCompany}</div>
 </div>
 
 <div class="field">
 <div class="label">Service Category:</div>
 <div class="value">${serviceLabel}</div>
 </div>
 
 <div class="section-title">Project Requirements</div>
 <div class="message-box">${sanitizedMessage}</div>
 
 <div class="section-title">Metadata</div>
 <div class="field">
 <div class="label">Submission Date:</div>
 <div class="value">${submissionTime}</div>
 </div>
 <div class="field">
 <div class="label">Source:</div>
 <div class="value">KVYASH Technologies Website</div>
 </div>
 
 <div class="footer">
 Please review this enquiry and contact the visitor using the submitted business email.
 </div>
 </div>
 </body>
 </html>
 `;

 // Plain text fallback body
 const textFallback = `
KVYASH Technologies
New Website Enquiry

--------------------------------

CONTACT DETAILS

Full Name:
${name.trim()}

Business Email:
${email.trim()}

Phone Number:
${phone.trim()}

Organization:
${company ? company.trim() : "N/A"}

Service Category:
${serviceLabel}

Project Requirements:
${message.trim()}

Submission Date:
${submissionTime}

Source:
KVYASH Technologies Website

--------------------------------

Please review this enquiry and contact the visitor using the submitted business email.
 `;

 // Make the POST request directly to the Resend API
 const resendResponse = await fetch("https://api.resend.com/emails", {
 method: "POST",
 headers: {
 "Authorization": `Bearer ${resendApiKey}`,
 "Content-Type": "application/json"
 },
 body: JSON.stringify({
 from: fromEmail,
 to: toEmail,
 reply_to: email.trim(),
 subject: emailSubject,
 html: htmlBody,
 text: textFallback
 })
 });

 if (!resendResponse.ok) {
 const errorText = await resendResponse.text();
 console.error(`Resend API returned error: ${resendResponse.status} - ${errorText}`);
 return NextResponse.json(
 { success: false, message: "Unable to send your enquiry right now. Please try again." },
 { status: 502 }
 );
 }

 return NextResponse.json({ success: true });
 } catch (error) {
 console.error("Unhandled error in contact API route handler:", error);
 return NextResponse.json(
 { success: false, message: "An unexpected error occurred. Please try again later." },
 { status: 500 }
 );
 }
}
