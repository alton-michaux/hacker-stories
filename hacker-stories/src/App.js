import React, { useState, useEffect, useReducer } from "react";
import Input from "./inputComponent";
import Items from "./items";
import "./App.css"

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
      if (searchTerm === '') return;

      const genre = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
      console.log(genre)
      const page = 1
      const year = 2022
      const type = 'movie'
      const limit = 50
      const endpoint = `https://moviesdatabase.p.rapidapi.com/titles?&titleType=${type}&genre=${genre}&limit=${limit}&year=${year}&page=${page}`

      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'f512439e7bmshfcd6bd4a75c5610p120950jsn4df1718c8117',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' 
          }     
        };

        const response = await fetch(endpoint, options)

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
    return (
      entry.titleText.text.toLowerCase().includes(searchTerm.toLowerCase()) || entry.titleType.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

  return (
    <div style={{ textAlign: "center" }} className="main-div">
      <h1>Horror Movies 2022</h1>

      <Input
        id="search"
        type="text"
        isFocused
        identifier={searchTerm}
        inputAction={handleSearch}
      >
        <strong>Search: </strong>
      </Input>

      <hr className="divider" />

      <div className="list-div">
        {list.isError && <p>Something went wrong ...</p>}

        {list.isLoading ? (
          <p> Loading... </p>
        ) : (
          <Items list={list.data} onRemoveItem={handleRemoveItem} />
        )
        }
      </div>
    </div>
  );
};

export default App;
