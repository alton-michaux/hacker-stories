import React, { useState, useEffect, useReducer, useCallback } from "react";
import UseSemiPersistentState from "./semiPerssistentState";
import ListReducer from "./reducers";
import Input from "./inputComponent";
import SearchButton from "./buttonComponent";
import Items from "./items";
import "./App.css"

const App = () => {
  // state variables

  const [searchTerm, setSearchTerm] = UseSemiPersistentState("search", "");

  const [genre, setGenre] = UseSemiPersistentState("genre", "");

  const [year, setYear] = UseSemiPersistentState("year", "");

  const [endpoint, setEndpoint] = useState('')

  const [list, dispatchList] = useReducer(
    ListReducer,
    { data: [], isLoading: false, isError: false }
  );

  // function that makes the API call

  const fetchData = useCallback(async () => {
    dispatchList({ type: 'LIST_FETCH_INIT' })

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f512439e7bmshfcd6bd4a75c5610p120950jsn4df1718c8117',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(endpoint, options)

      const data = await response.json()

      dispatchList({ type: 'LIST_FETCH_SUCCESS', payload: data.results })
    } catch {
      if (!endpoint) {
        dispatchList({ type: 'LIST_NO_INIT' })
      }
      dispatchList({ type: 'LIST_FETCH_FAILURE' })
    }
  }, [endpoint])

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000)
  }, [fetchData]);

  // handlers

  const handleSearchInput = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleYearInput = (event) => {
    event.preventDefault();
    setYear(event.target.value)
  }

  const handleGenreInput = (event) => {
    event.preventDefault()
    setGenre(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
  }

  const handleBuildEndpoint = () => {
    const page = 1
    const type = 'movie'
    const limit = 50

    setEndpoint(`https://moviesdatabase.p.rapidapi.com/titles?&titleType=${type}&genre=${genre}&limit=${limit}&year=${year}&page=${page}`)
  }

  const handleRemoveItem = (item) => {
    dispatchList({
      type: 'REMOVE_LIST',
      payload: item
    })
  };

  // keyword search filter

  const filteredEntries = list.data.filter((entry) => {
    return (
      entry.titleText.text.toLowerCase().includes(searchTerm.toLowerCase()) || entry.titleType.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

  return (
    <div style={{ textAlign: "center" }} className="main-div">
      <h1>{genre} Movies {year}</h1>

      <div className="input-div">
        <Input
          id="genre"
          type="text"
          isFocused
          identifier={genre}
          input={handleGenreInput}
        >
          <strong>Genre: </strong>
        </Input>

        <Input
          id="year"
          type="text"
          isFocused
          identifier={year}
          input={handleYearInput}
        >
          <strong>Year: </strong>
        </Input>
      </div>

      <div className="search-button-div">
        <SearchButton
          identifier={genre}
          inputAction={handleBuildEndpoint}
          loading={list.isLoading}
        ></SearchButton>
      </div>

      <hr className="divider" />

      <div className="input-div">
        <Input
          id="search"
          type="text"
          isFocused
          identifier={searchTerm}
          input={handleSearchInput}
        >
          <strong>Search: </strong>
        </Input>
      </div>

      <hr className="divider" />

      <div className="list-div">
        {list.isError && <p>Something went wrong ...</p>}

        {list.isLoading ? (
          <p> Loading... </p>
        ) : (
          <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
        )
        }
      </div>
    </div>
  );
};

export default App;
