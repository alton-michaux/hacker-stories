import React from "react";
import Item from "./Item";

function Items({ list, onRemoveItem }) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {list.map((entry) => {
        return (
          <Item key={entry.objectID} item={entry} onRemoveItem={() => onRemoveItem(entry)} />
        );
      })}
    </ul>
  );
}

export default Items;
