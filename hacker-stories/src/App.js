import React, { useState, useEffect, useReducer } from "react";
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

const listReducer = (state, action) => {
  switch(action.type) {
    case 'SET_LIST':
      return action.payload
    case 'REMOVE_LIST':
      return state.filter(
        (entry) => action.payload.objectID !== entry.objectID
      );
    default:
      throw new Error();}
}

const getAsyncList = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { list: List } }),
      2000
    )
  );

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [list, dispatchList] = useReducer(listReducer, []);

  const [isLoading, setIsLoading] = useState(false); // loading state

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  
    getAsyncList().then(result => {
      dispatchList({
        type: 'SET_LIST',
        payload: result.data.list,
      })
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
      setIsError(true)
    }); // mention to Roy, can't get setIsError to work
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleRemoveItem = (item) => {
    dispatchList({
      type: 'REMOVE_LIST',
      payload: item
    })
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

      { isError && <p>Something went wrong ...</p> }

      { isLoading ? (
          <p> Loading... </p>
        ) : (
          <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
        )
      }
    </div>
  );
};

export default App;
