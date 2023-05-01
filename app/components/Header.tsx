"use client";
import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

interface SearchProps {
  search?: String;
}

const Header: FC<SearchProps> = ({ search }): ReactElement => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <div
      className={` ${
        !search && "h-64"
      }  bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2`}
    >
      <div className={!search ? `text-center mt-10` : ""}>
        {!search && (
          <h1 className="text-white text-5xl font-bold mb-2">
            Find your table for any occasion
          </h1>
        )}

        {/* SEARCH BAR */}
        <div className="text-left text-lg py-3 m-auto flex justify-center">
          <input
            className="rounded  mr-3 p-2 w-[450px]"
            type="text"
            placeholder="State, city or town"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="rounded bg-red-600 px-9 py-2 text-white"
            onClick={() => {
              if (location === "banana") return router.push("/search");
            }}
          >
            Let's go
          </button>
        </div>
        {/* SEARCH BAR */}
      </div>
    </div>
  );
};

Header.propTypes = {
  search: PropTypes.string,
};

export default Header;
