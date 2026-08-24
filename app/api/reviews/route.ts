import { NextRequest, NextResponse } from "next/server";

// Dynamic routing configuration
export const dynamic = "force-dynamic";

const recentSubmissions = new Map<string, number>();
const THROTTLE_WINDOW_MS = 10000; // 10 seconds per email

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

 const { name, email, company, role, service, rating, review, photoUrl, photoConsent, website } = body;

 // 1. Honeypot check for spam bots
 if (website && website.trim().length > 0) {
 return NextResponse.json({ success: true, message: "Feedback submitted." });
 }

 // 2. Validate inputs
 if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid name (2 to 100 characters)." },
 { status: 400 }
 );
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid work email address." },
 { status: 400 }
 );
 }

 if (!company || typeof company !== "string" || company.trim().length < 2 || company.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter a valid organization name." },
 { status: 400 }
 );
 }

 if (!role || typeof role !== "string" || role.trim().length < 2 || role.trim().length > 100) {
 return NextResponse.json(
 { success: false, message: "Please enter your job role/designation." },
 { status: 400 }
 );
 }

 if (!service || typeof service !== "string" || service.trim().length < 2) {
 return NextResponse.json(
 { success: false, message: "Please select or enter the service category." },
 { status: 400 }
 );
 }

 const ratingVal = Number(rating);
 if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
 return NextResponse.json(
 { success: false, message: "Please provide a rating between 1 and 5 stars." },
 { status: 400 }
 );
 }

 if (!review || typeof review !== "string" || review.trim().length < 10 || review.trim().length > 1000) {
 return NextResponse.json(
 { success: false, message: "Please enter a review description between 10 and 1000 characters." },
 { status: 400 }
 );
 }

 // 3. Double submit rate limit check
 const emailKey = email.trim().toLowerCase();
 const now = Date.now();
 const lastSubmitTime = recentSubmissions.get(emailKey);
 if (lastSubmitTime && now - lastSubmitTime < THROTTLE_WINDOW_MS) {
 return NextResponse.json(
 { success: false, message: "Feedback already received. Please wait a moment before resubmitting." },
 { status: 429 }
 );
 }
 recentSubmissions.set(emailKey, now);

 // Clean up map keys to prevent memory leak
 for (const [key, value] of recentSubmissions.entries()) {
 if (now - value > THROTTLE_WINDOW_MS) {
 recentSubmissions.delete(key);
 }
 }

 // 4. Sanitize strings before storing/processing
 const sanitizedName = sanitizeHtml(name.trim());
 const sanitizedCompany = sanitizeHtml(company.trim());
 const sanitizedRole = sanitizeHtml(role.trim());
 const sanitizedService = sanitizeHtml(service.trim());
 const sanitizedReview = sanitizeHtml(review.trim());
 const sanitizedPhotoUrl = photoUrl ? sanitizeHtml(photoUrl.trim()) : "";

 console.log("Feedback Scoping Submission (Pending Internal Verification):", {
 name: sanitizedName,
 email: email.trim(),
 company: sanitizedCompany,
 role: sanitizedRole,
 service: sanitizedService,
 rating: ratingVal,
 review: sanitizedReview,
 photoUrl: sanitizedPhotoUrl,
 photoConsent: !!photoConsent,
 verified: false,
 approved: false,
 submittedAt: new Date().toISOString()
 });

 return NextResponse.json({
 success: true,
 message: "Thank you. Your feedback has been submitted for internal verification."
 });
 } catch (error) {
 console.error("Unhandled review API error:", error);
 return NextResponse.json(
 { success: false, message: "An unexpected error occurred. Please try again." },
 { status: 500 }
 );
 }
}
