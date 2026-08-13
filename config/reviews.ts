/**
 * KVYASH TECHNOLOGIES — CLIENT REVIEWS STORAGE
 * 
 * IMPORTANT SAFETY RULES & GUIDELINES:
 * 1. DO NOT populate this file with simulated, mock, or fake testimonials.
 * 2. Only genuine feedback from actual clients (received through the scoping portal) is permitted.
 * 3. Never invent names, companies, ratings, or email addresses.
 * 4. Reviewer email addresses are confidential and must NEVER be published or exposed in this array.
 * 5. Profile photos are optional and can only be published if photoConsent is true.
 * 
 * PUBLICATION WORKFLOW:
 * A. Visitor submits feedback via the /submit-review form (logged securely on server logs).
 * B. Admin verifies client identity internally.
 * C. Admin manually appends the clean verified review to this array, ensuring:
 *    - verified = true
 *    - approved = true
 *    - email field is omitted or left empty to prevent public leakage.
 */

export interface ClientReview {
  id: string;
  name: string;
  email?: string; // Internally used for verification only, omit in public production array
  company: string;
  role: string;
  service: string;
  rating: number; // 1 to 5 stars
  review: string;
  photoUrl?: string; // Optional image URL
  photoConsent: boolean; // Explicit client consent check
  verified: boolean; // Verified indicator flag
  approved: boolean; // Moderation publication flag
  createdAt: string;
}

// Published client feedback database
export const clientReviews: ClientReview[] = [
  // Empty state is rendered on home layouts until verified reviews are manually added below.
];
