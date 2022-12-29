const SearchButton = ({ identifier, inputAction, loading }) => {

  return (
    <div>
      <button
        className="search-button"
        type="button"
        disabled={!identifier || loading}
        onClick={inputAction}
      > Search
      </button>
    </div>
  );
};

export default SearchButton;
