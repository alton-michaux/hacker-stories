import React from 'react';

const list = [
  {
  title: "Halloween",
  director: "John Carpenter",
  releaseYear: 1978,
  id: 1
  },
  {
    title: "A Nightmare on Elm Street",
    director: "Wes Craven",
    releaseYear: 1984,
    id: 2
  },
  {
    title: "Texas Chainsaw Massacre",
    director: "Tobe Hooper",
    releaseYear: 1974,
    id: 3
  },
  {
    title: "The Thing",
    director: "John Carpenter",
    releaseYear: 1982,
    id: 4
  },
  {
    title: "The Fly",
    director: "David Cronenberg",
    releaseYear: 1986,
    id: 5
  }
]

function Search(){
  return (
    <div>
      <label htmlFor="search">search</label>
      <input id="search" type="text"></input>
    </div>
  )
}

function List(){
 return (
  <ul list-style-type="none">
    { list.map(function (movie) {
      return <li key={movie.id}><b>{movie.title}</b>, released in <b>{movie.releaseYear}</b> directed by <b>{movie.director}</b></li>
      })
    }
  </ul>
 )
}

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Horror Classics
      </h1>

      <Search />

      <hr/>

      <List />
    </div>
  );
}

export default App;
