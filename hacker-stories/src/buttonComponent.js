const SearchButton = ({ identifier, inputAction, loading, children, type }) => {

  return (
    <div>
      <button
        className="search-button"
        type={type}
        disabled={!identifier || loading}
        onClick={inputAction}
      > {children}
      </button>
    </div>
  );
};

export default SearchButton;
