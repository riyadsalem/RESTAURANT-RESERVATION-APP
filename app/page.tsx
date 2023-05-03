import { Header, RestaurantCard } from "./components";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        <RestaurantCard />
      </div>
    </main>
  );
}

// SELECT * FROM restaurant WHERE id = 4 // SQL Query
// Prisma.restuant.findUnique(4) // Prisma Query
