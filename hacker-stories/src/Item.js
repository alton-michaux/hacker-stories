import React from "react";

const Item = ({ item, onRemoveItem }) => (
	<li style={{ padding: "2px" }}>
		<span>
			<a href={item.poster_path}>{item.original_title} </a>
		</span>
		<span> and released in {item.release_date}</span>
		<span>
			<button type="button" onClick={onRemoveItem.bind(null,item)}>
				Delete
			</button>
		</span>
	</li>
);

export default Item;
