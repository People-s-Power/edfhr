import React from "react";
import PropTypes from "prop-types";
import { Loader } from "rsuite";

interface Search {
  onSearch(a: string): void;
  loading?: boolean;
}

const SearchComp: React.FC<Search> = ({ onSearch, loading }) => {
  return (
    <div className="search-wrapper">
      <input
        type="search"
        name=""
        placeholder="search"
        className=""
        onChange={(e) => onSearch(e.target.value)}
      />
      {loading ? <Loader /> : <i className="fas fa-search"></i>}
    </div>
  );
};

export default SearchComp;

SearchComp.propTypes = {
  onSearch: PropTypes.func,
  loading: PropTypes.bool,
};
