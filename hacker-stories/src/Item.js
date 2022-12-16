import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
	< li style = {{ padding: "5px" }}>
		<span>{item.original_title} </span>
		<span> was released {item.release_date} </span>
		<span>
			<button type="button" onClick={() => onRemoveItem(item)}>
				Delete
			</button>
		</span>
	</li >
)};

export default Item;
