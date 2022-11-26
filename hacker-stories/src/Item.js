import React from 'react';

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

export default Item;
