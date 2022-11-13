import React from 'react';

const App = () => {
  const list = [
    {
    title: "Halloween",
    director: "John Carpenter",
    releaseYear: 1978,
    url: "https://en.wikipedia.org/wiki/Halloween_(1978_film)",
    objectID: 1
    },
    {
      title: "A Nightmare on Elm Street",
      director: "Wes Craven",
      releaseYear: 1984,
      url: "https://en.wikipedia.org/wiki/A_Nightmare_on_Elm_Street",
      objectID: 2
    },
    {
      title: "Texas Chainsaw Massacre",
      director: "Tobe Hooper",
      releaseYear: 1974,
      url: "https://en.wikipedia.org/wiki/The_Texas_Chain_Saw_Massacre",
      objectID: 3
    },
    {
      title: "The Thing",
      director: "John Carpenter",
      releaseYear: 1982,
      url: "https://www.imdb.com/title/tt0084787/",
      objectID: 4
    },
    {
      title: "The Fly",
      director: "David Cronenberg",
      releaseYear: 1986,
      url: "https://www.imdb.com/title/tt0091064/?ref_=nv_sr_srsg_0",
      objectID: 5
    }
  ]
  
  const [searchTerm, setSearchTerm] = React.useState('Halloween');

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  const filteredMovies = list.filter((movie) => 
    (movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Horror Classics
      </h1>
  
      <Search searchTerm={searchTerm} onSearch={handleSearch}/>
  
      <hr/>
  
      <Movies list={filteredMovies} />
    </div>
  );
}

const Search = ({searchTerm, onSearch}) => (
    <div>
      <label htmlFor="search">Search: </label>
      <input 
        id="search" 
        type="text" 
        onChange={onSearch}
        value={searchTerm}
      />
    </div>
  )

const Movies = ({ list }) =>  (
  <ul style={{listStyleType: "none"}} >
    { list.map(({objectID, ...movie}) => {
      return (
        < Item key={objectID} {...movie} />
      )
      })
    }
  </ul>
)

const Item = ({ title, url, director, releaseYear }) => {
  return (
    <li>
      <span>
        <a href={url}>{title} </a>
      </span>
      <span> was directed by {director}</span>
      <span> and released in {releaseYear}</span>
    </li>
  )
}

export default App;
