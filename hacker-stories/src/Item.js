import React from "react";

const Item = ({ item, onRemoveItem }) => (
	<li style={{ padding: "2px" }}>
		<span>
			<a href={item.url}>{item.title} </a>
		</span>
		<span> was directed by {item.director}</span>
		<span> and released in {item.releaseYear}</span>
		<span>
			<button type="button" onClick={onRemoveItem.bind(null,item)}>
				Delete
			</button>
		</span>
	</li>
);

export default Item;
