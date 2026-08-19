import React from "react";
import SubmitReviewClient from "./SubmitReviewClient";

export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Submit Review"
  },
  description: "Provide feedback on your project with KVYASH Technologies. Share details of custom software engineering, AI automation, or web development collaborations.",
  alternates: {
    canonical: "https://kvyash.com/submit-review",
  },
};

export default function SubmitReviewPage() {
  return <SubmitReviewClient />;
}
