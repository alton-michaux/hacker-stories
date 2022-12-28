import React, { useEffect, useRef } from "react";

const SearchButton = ({identifier, inputAction }) => {

  return (
    <div>
      <button
        className="search-button"
        type="button"
        disabled={!identifier}
        onClick={inputAction}
      > Search
      </button>
    </div>
  );
};

export default SearchButton;
