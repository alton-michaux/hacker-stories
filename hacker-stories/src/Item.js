import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
		< li style={{ padding: "5px" }} className="item">
			{item.primaryImage ?
				<>
					<span>
						<img src={item.primaryImage.url} alt={item.primaryImage.caption.plainText} width="100%" height="100%" />
					</span>
					<span>{item.titleText.text} </span>
					<br />
					<span>
						<button type="button" onClick={() => onRemoveItem(item)} className="delete-btn">
							Delete
						</button>
					</span>

				</> :
				<>
					<span>{item.titleText.text} </span>
					<br />
					<span>
						<button type="button" onClick={() => onRemoveItem(item)} className="delete-btn">
							Delete
						</button>
					</span>
				</>
			}
		</li >
	)
};

export default Item;
