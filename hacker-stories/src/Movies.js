import React from 'react';
import Item from './Item'

function Movies({ list }) {
	return (
		<ul style={{ listStyleType: "none" }}>
			{list.map(({ objectID, ...movie }) => {
				return (
					<Item key={objectID} {...movie} />
				);
			})}
		</ul>
	);
}

export default Movies;
