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
  console.log("state", state, "action", action, "payload", action.payload)
  switch (action.type) {
    case 'LIST_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'LIST_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'LIST_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_LIST':
      return {
        ...state,
        data: state.data.filter(
          (entry) => action.payload.objectID !== entry.objectID
        ),
      };
    default:
      throw new Error();
  }
}

// const getAsyncList = () =>
//   new Promise((resolve) =>
//     setTimeout(
//       () => resolve({ data: { list: List } }),
//       2000
//     )
//   );

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [list, dispatchList] = useReducer(
    listReducer,
    { data: [], isLoading: false, isError: false }
  );

  useEffect(() => {
    dispatchList({ type: 'LIST_FETCH_INIT' })

    async function fetchData() {
      try {
        const apiKey = '8319dc8ed5msh9c5b33dbb89ad3fp1e984djsn8545acb6dcbc';

        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ttps://movie-database-alternative.p.rapidapi.com/?s=Halloween&r=json&page=1'
          }
        };

        const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=*=json&page=1', options)

        console.log('response', await response)
        const data = await response.json()

        console.log("data", data)

        dispatchList({ type: 'LIST_FETCH_SUCCESS' }, { data: data })
      } catch {
        dispatchList({ type: 'LIST_FETCH_FAILURE' })
      }
    }

    setTimeout(() => {
      fetchData();
    }, 3000)
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

  const filteredEntries = list.data.filter((entry) =>
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

      {list.isError && <p>Something went wrong ...</p>}

      {list.isLoading ? (
        <p> Loading... </p>
      ) : (
        <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
      )
      }
    </div>
  );
};

export default App;
