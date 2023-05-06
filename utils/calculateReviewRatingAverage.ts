import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0; // 0/0 => NaN

  return (
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length
  );
};
