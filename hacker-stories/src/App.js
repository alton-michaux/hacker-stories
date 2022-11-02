import React from 'react';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    props.onSearch(event);
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>
        <span>Searching for...<strong>{searchTerm}</strong></span>
      </p>
    </div>
  )
}

const Movies = (props) =>  (
  <ul list-style-type="none">
    { props.list.map((movie) => {
      return (
        < Item key={movie.id} item={movie} />
      )
      })
    }
  </ul>
)

const Item = (props) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>{props.item.title} </a>
      </span>
      <span> was directed by {props.item.director}</span>
      <span> and released in {props.item.releaseYear}</span>
    </li>
  )
}

const App = () => {
  const list = [
    {
    title: "Halloween",
    director: "John Carpenter",
    releaseYear: 1978,
    url: "https://en.wikipedia.org/wiki/Halloween_(1978_film)",
    ObjectId: 1
    },
    {
      title: "A Nightmare on Elm Street",
      director: "Wes Craven",
      releaseYear: 1984,
      url: "https://en.wikipedia.org/wiki/A_Nightmare_on_Elm_Street",
      ObjectId: 2
    },
    {
      title: "Texas Chainsaw Massacre",
      director: "Tobe Hooper",
      releaseYear: 1974,
      url: "https://en.wikipedia.org/wiki/The_Texas_Chain_Saw_Massacre",
      ObjectId: 3
    },
    {
      title: "The Thing",
      director: "John Carpenter",
      releaseYear: 1982,
      url: "https://www.imdb.com/title/tt0084787/",
      ObjectId: 4
    },
    {
      title: "The Fly",
      director: "David Cronenberg",
      releaseYear: 1986,
      url: "https://www.imdb.com/title/tt0091064/?ref_=nv_sr_srsg_0",
      ObjectId: 5
    }
  ]

  const handleSearch = (event) => {
    console.log(event.target.value)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Horror Classics
      </h1>
  
      <Search onSearch={handleSearch}/>
  
      <hr/>
  
      <Movies list={list} />
    </div>
  );
}

export default App;
