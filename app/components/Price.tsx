import { PRICE } from "@prisma/client";
import React, { FC } from "react";

type Price = {
  price: PRICE;
};

const Price: FC<Price> = ({ price }) => {
  const renderPrice = () => {
    switch (price) {
      case PRICE.CHEAP:
        return (
          <>
            <span>$$</span> <span className="text-gray-400">$$</span>
          </>
        );
      case PRICE.REGULAR:
        return (
          <>
            <span>$$$</span> <span className="text-gray-400">$</span>
          </>
        );
      default:
        return (
          <>
            <span>$$$$</span>
          </>
        );
    }
  };

  return <p className="flex mr-3">{renderPrice()}</p>;
};

export default Price;
