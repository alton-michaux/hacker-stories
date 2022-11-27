import React from 'react';
import Item from './Item'

function Movies({ list, onRemoveItem }) {
	return (
		<ul style={{ listStyleType: "none" }}>
			{list.map(({ objectID, ...movie }) => {
				return (
					<Item key={objectID} {...movie} onRemoveItem={onRemoveItem}/>
				);
			})}
		</ul>
	);
}

export default Movies;
