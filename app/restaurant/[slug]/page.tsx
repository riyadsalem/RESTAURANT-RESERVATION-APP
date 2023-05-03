import { type } from "os";
import {
  Description,
  Images,
  Rating,
  ReservationCard,
  RestaurantNavBar,
  Reviews,
  Title,
} from "./components";

import { PrismaClient } from "@prisma/client";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  //   props: { params: { slug: 'coconut-lagoon-ottawa' }, searchParams: {} }

  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 mb-4 shadow">
        <RestaurantNavBar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
