import React, { useState, useEffect } from "react";
import Input from "./inputComponent";
import Items from "./items";
import List from "./list";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [list, setList] = useState(List);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleRemoveItem = (item) => {
    const newItems = list.filter((entry) => item.objectID !== entry.objectID);
    return setList(newItems);
  };

  const filteredEntries = list.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Horror Classics</h1>

      <Input
        id="search"
        type="text"
        isFocused
        identifier={searchTerm}
        inputAction={handleSearch}
      >
        <strong>Search:</strong>
      </Input>

      <hr />

      <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default App;
