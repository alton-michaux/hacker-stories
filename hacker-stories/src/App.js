import React, { useState, useEffect, useReducer } from "react";
import Input from "./inputComponent";
import Items from "./items";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const listReducer = (state, action) => {
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
          (entry) => action.payload.id !== entry.id),
      };
    default:
      throw new Error();
  }
}

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
        const apiKey = 'e6b8f17a0b41c55c1722ac4b0c7f1772';
        const genre = 'horror';
        const page = '1';

        const options = {
          method: 'GET',
        };

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=free`, options)

        const data = await response.json()

        dispatchList({ type: 'LIST_FETCH_SUCCESS', payload: data.results })
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

  const filteredEntries = list.data.filter((entry) => {
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Trending Movies</h1>

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
        <Items list={list.data} onRemoveItem={handleRemoveItem} />
      )
      }
    </div>
  );
};

export default App;
