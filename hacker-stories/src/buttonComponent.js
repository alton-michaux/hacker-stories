const SearchButton = ({ identifier, loading, children }) => {

  return (
    <div>
      <button
        className="search-button"
        type="submit"
        disabled={!identifier || loading}
      > {children}
      </button>
    </div>
  );
};

export default SearchButton;
