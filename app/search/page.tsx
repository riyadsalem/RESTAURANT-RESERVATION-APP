import { Header } from "../components";
import { RestaurantCard, SearchSideBar } from "./components";

export default function Search() {
  return (
    <>
      <Header search="search" />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          <RestaurantCard />
        </div>
      </div>
    </>
  );
}
