import { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

interface SearchProps {
  search?: String;
}

const Header: FC<SearchProps> = ({ search }): ReactElement => {
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
        <SearchBar />
      </div>
    </div>
  );
};

Header.propTypes = {
  search: PropTypes.string,
};

export default Header;
