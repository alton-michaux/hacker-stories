import React, { useState, useEffect } from "react";
import Input from "./inputComponent";
import Movies from "./Movies";
import List from "./List";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const filteredMovies = List.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Horror Classics</h1>

      <Input
        id="search"
        type="text"
        identifier={searchTerm}
        inputAction={handleSearch}
      >
        <strong>Search:</strong>
      </Input>

      <hr />

      <Movies list={filteredMovies} />
    </div>
  );
};

export default App;
