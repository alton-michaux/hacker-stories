import React from 'react';

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

export default Search;
