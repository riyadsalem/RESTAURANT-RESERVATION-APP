import { FC, ReactElement } from "react";
import ReviewCard from "./ReviewCard";
import { Review } from "@prisma/client";

const Reviews: FC<{ reviews: Review[] }> = ({ reviews }): ReactElement => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length === 1 ? "person" : "people"}
        are saying
      </h1>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
