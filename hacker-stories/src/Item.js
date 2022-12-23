import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
		< li style={{ padding: "5px" }} className="item">
			{item.primaryImage ?
				<>
					<span>
						<img src={item.primaryImage.url} alt={item.primaryImage.caption.plainText} width="100%" height="70%" />
					</span>
				</> :
				<>
					<span>
						<img src="https://static6.depositphotos.com/1002881/580/i/600/depositphotos_5804811-stock-photo-error-404.jpg" alt={item.titleText.text} width="100%" height="70%" />
					</span>
				</>
			}
			<span><h2 className="item-title">{item.titleText.text}</h2></span>
			<br />
			<div className="delete-btn-div">
				<span>
					<button type="button" onClick={() => onRemoveItem(item)} className="delete-btn">
						Remove From List
					</button>
				</span>
			</div>
		</li >
	)
};

export default Item;
