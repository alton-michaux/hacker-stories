import React, { useState, useEffect, useReducer, useCallback } from "react";
import axios from 'axios';
import UseSemiPersistentState from "./semiPerssistentState";
import ListReducer from "./reducers";
import Input from "./inputComponent";
import SearchButton from "./buttonComponent";
import Items from "./items";
import "./App.css"

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
console.log('list', list)
  const filteredEntries = list.data.filter((entry) => {
    return (
      entry.titleText.text.toLowerCase().includes(searchTerm.toLowerCase()) || entry.titleType.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

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

  const handleSearchAction = () => {
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
    <main style={{ textAlign: "center" }} className="main-div">
      <section className="info-div">
        <h1 className="headline">{genre} Movies {year}</h1>
        <aside className="input-div">
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
        </aside>

        <aside className="button-div">
          <SearchButton
            identifier={genre}
            inputAction={handleSearchAction}
            loading={list.isLoading}
          >Search</SearchButton>
        </aside>

        <hr className="divider" />

        <aside className="search-save-div">
          <Input
            id="search"
            type="text"
            isFocused
            identifier={searchTerm}
            input={handleSearchInput}
          >
            <strong>Search: </strong>
          </Input>

          <SearchButton
            identifier={filteredEntries}
            inputAction={handleSaveList}
          >Save List</SearchButton>
        </aside>
      </section>

      <section className="list-div">
        {list.isError && <p>Something went wrong...</p>}

        {list.isBlank && <p>No data.</p>}

        {list.isLoading ? (
          <p> Loading... </p>
        ) : (
          <Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
        )
        }
      </section>
    </main>
  );
};

export default App;
