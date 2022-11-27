import React from 'react';

const Input = ({identifier, inputAction}) => (
	<div>
		<label htmlFor="search">Search: </label>
		<input 
			id="search" 
			type="text" 
			onChange={inputAction}
			value={identifier}
		/>
	</div>
)

export default Input;
