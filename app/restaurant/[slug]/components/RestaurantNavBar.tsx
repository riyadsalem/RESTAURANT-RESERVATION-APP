import Link from "next/link";
import { FC, ReactElement } from "react";

type RestaurantNavBarProps = {
  slug?: string;
};

const RestaurantNavBar: FC<RestaurantNavBarProps> = ({
  slug,
}): ReactElement => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>

      <Link href={`/restaurant/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
