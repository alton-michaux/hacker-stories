import React from 'react';

function App() {
  const list = [
    {
    title: "Scary Movie 1",
    director: "Director1",
    releaseYear: 1990
    },
    {
      title: "Scary Movie 2",
      director: "Director2",
      releaseYear: 1995
    },
    {
      title: "Scary Movie 3",
      director: "Director3",
      releaseYear: 2000
    },
    {
      title: "Scary Movie 4",
      director: "Director4",
      releaseYear: 2005
    },
    {
      title: "Scary Movie 5",
      director: "Director5",
      releaseYear: 2012
    }
  ]

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Horror Classics
      </h1>

      <label htmlFor="search">search</label>
      <input id="search" type="text"></input>

      <hr/>

      <ul>
        { list.map(function (movie) {
          return <li key={movie.id}><b>{movie.title}</b>, released in <b>{movie.releaseYear}</b> directed by <b>{movie.director}</b></li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
