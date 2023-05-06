import { Review } from "@prisma/client";
import { FC, ReactElement } from "react";
import { calculateReviewRatingAverage } from "../../../../utils/calculateReviewRatingAverage";

const Rating: FC<{ reviews: Review[] }> = ({ reviews }): ReactElement => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length > 1 && "s"}
        </p>
      </div>
    </div>
  );
};

export default Rating;
