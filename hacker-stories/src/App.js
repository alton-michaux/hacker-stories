import React, { useState, useEffect } from 'react';
import Search from './Search'
import Movies from './Movies'
import List from './List'

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || "Halloween"
    );

  useEffect(() => {
    localStorage.setItem('search', searchTerm)
  }, [searchTerm])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  const filteredMovies = List.filter((movie) => 
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

export default App;
