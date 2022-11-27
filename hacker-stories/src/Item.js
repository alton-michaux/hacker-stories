import React from 'react';

const Item = ({ title, url, director, releaseYear, onRemoveItem }) => {
	const handleRemoveItem = () => {
	onRemoveItem({/* need to destructure the item here */})
	}

	return (
		<li style={{ padding: "2px" }}>
			<span>
				<a href={url}>{title} </a>
			</span>
			<span> was directed by {director}</span>
			<span> and released in {releaseYear}</span>
			<span>
				<button type="button" onClick={handleRemoveItem}>
					Dismiss
				</button>
			</span>
		</li>
	)
}

export default Item;
