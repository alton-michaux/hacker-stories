import React from "react";

const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem({ item });
  };

  return (
    <li style={{ padding: "2px" }}>
      <span>
        <a href={item.url}>{item.title} </a>
      </span>
      <span> was directed by {item.director}</span>
      <span> and released in {item.releaseYear}</span>
      <span>
        <button type="button" onClick={handleRemoveItem}>
          Delete
        </button>
      </span>
    </li>
  );
};

export default Item;
