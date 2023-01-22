import React, { useState, useEffect, useReducer, useCallback } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";
import UseSemiPersistentState from "./semiPerssistentState";
import ListReducer from "./reducers";
import "./App.css"
import Home from './Home'
import ListView from './ListView'

const App = () => {
  // state variables

  const [searchTerm, setSearchTerm] = useState('');

  const [genre, setGenre] = UseSemiPersistentState("genre", "");

  const [year, setYear] = UseSemiPersistentState("year", "");

  const [endpoint, setEndpoint] = useState('')

  const [list, dispatchList] = useReducer(
    ListReducer,
    { data: [], isLoading: false, isError: false, isBlank: false }
  );

  // custom functions
  const fetchData = useCallback(async () => {
    dispatchList({ type: 'LIST_FETCH_INIT' })

    if (!endpoint) {
      dispatchList({ type: 'LIST_NO_RESULTS' })
    }
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'X-RapidAPI-Key': 'f512439e7bmshfcd6bd4a75c5610p120950jsn4df1718c8117',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      })
      dispatchList({ type: 'LIST_FETCH_SUCCESS', payload: [...response.data.results] })
    } catch (error) {
      dispatchList({ type: 'LIST_FETCH_FAILURE' })
    }
  }, [endpoint])

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000)
  }, [fetchData]);

  const filteredEntries = list.data.filter((entry) => {
    return (
      entry.titleText.text.toLowerCase().includes(searchTerm.toLowerCase()) || entry.titleType.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

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

  const handleSearchAction = (event) => {
    event.preventDefault()
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

  const handleSaveList = () => {
    localStorage.setItem('list', JSON.stringify(filteredEntries))
    alert("List Saved!")
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Home
              genre={genre}
              year={year}
              list={list}
              handleGenreInput={handleGenreInput}
              handleYearInput={handleYearInput}
              handleSearchAction={handleSearchAction}
              searchTerm={searchTerm}
              handleSearchInput={handleSearchInput}
              handleRemoveItem={handleRemoveItem}
              filteredEntries={filteredEntries}
              handleSaveList={handleSaveList}
            ></Home>
          }
        ></Route>
        <Route
          path='/list'
          element={
            <ListView
              list={list}
              filteredEntries={filteredEntries}
              handleRemoveItem={handleRemoveItem}
              searchTerm={searchTerm}
              handleSearchInput={handleSearchInput}
            ></ListView>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
