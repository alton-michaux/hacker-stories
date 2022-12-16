import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
	< li style = {{ padding: "5px" }}>
		<span>{item.titleText.text} </span>
		<span>is a {item.titleType.text} that</span>
		<span> will be released in {item.releaseYear.year} </span>
		<span>
			<button type="button" onClick={() => onRemoveItem(item)}>
				Delete
			</button>
		</span>
	</li >
)};

export default Item;
