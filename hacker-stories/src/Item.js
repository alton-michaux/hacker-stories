import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
	< li style = {{ padding: "5px" }} className="item">
		{/* <img src={item.primaryImage.url} alt={item.primaryImage.caption.plainText}/> */}
		<span>{item.titleText.text} </span>
		<br/>
		<span>
			<button type="button" onClick={() => onRemoveItem(item)} className="delete-btn">
				Delete
			</button>
		</span>
	</li >
)};

export default Item;
