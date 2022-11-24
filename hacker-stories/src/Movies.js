import React from 'react';
import Item from './Item'

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

export default Movies;
