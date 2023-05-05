import { Header } from "../components";
import { RestaurantCard, SearchSideBar } from "./components";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

export interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

type Name = {
  name: {
    equals: string;
  };
};

interface Where {
  location?: Name;
  cuisine?: Name;
  price?: {
    equals: PRICE;
  };
}

const fetchRestaurantByCity = (
  searchParams: SearchParams
): Promise<Restaurant[] | []> => {
  const where: Where = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantByCity(searchParams);
  const location = await fetchLocations();
  const cuisine = await fetchCuisines();

  return (
    <>
      <Header search="search" />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={location}
          cuisines={cuisine}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
