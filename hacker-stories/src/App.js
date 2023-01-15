import React, { useState, useEffect, useReducer, useCallback } from "react";
import UseSemiPersistentState from "./semiPerssistentState";
import ListReducer from "./reducers";
import Input from "./inputComponent";
import Items from "./items";
import SearchForm from "./searchForm";
import "./App.css"
import axios from 'axios';

const App = () => {
  // state variables

  const [searchTerm, setSearchTerm] = UseSemiPersistentState("search", "");

  const [genre, setGenre] = UseSemiPersistentState("genre", "");

  const [year, setYear] = UseSemiPersistentState("year", "");

  const [endpoint, setEndpoint] = useState('')

  const [list, dispatchList] = useReducer(
    ListReducer,
    { data: [], isLoading: false, isError: false, isEmpty: false }
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
      const response = await axios(endpoint, options)

      if (response.data.page) {
        dispatchList({ type: 'LIST_FETCH_SUCCESS', payload: response.data.results })
      } else {
        dispatchList({ type: 'LIST_NO_INIT' })
      }
    } catch {
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

  const handleBuildEndpoint = (event) => {
    const page = 1
    const type = 'movie'
    const limit = 50

    setEndpoint(`https://moviesdatabase.p.rapidapi.com/titles?&titleType=${type}&genre=${genre}&limit=${limit}&year=${year}&page=${page}`)

    event.preventDefault()
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

      <SearchForm
        handleEvent={handleBuildEndpoint}
        inputIDs={[genre, year]}
        handleInputs={[handleGenreInput, handleYearInput]}
        list={list}
      ></SearchForm>

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
        {list.isLoading ? (
          <p> Loading... </p>
        ) : (
          <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
        )
        }

        {list.isEmpty && <p>No Data</p>}
        {list.isError && <p>Something went wrong...</p>}
      </div>
    </div>
  );
};

export default App;
