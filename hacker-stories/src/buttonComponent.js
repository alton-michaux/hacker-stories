const SearchButton = ({ identifier, inputAction, loading, children }) => {

  return (
    <div>
      <button
        className="search-button"
        type="button"
        disabled={!identifier || loading}
        onClick={inputAction}
      > {children}
      </button>
    </div>
  );
};

export default SearchButton;
