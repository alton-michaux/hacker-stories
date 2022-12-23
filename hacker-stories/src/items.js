import React from "react";
import Item from "./Item";

function Items({ list, onRemoveItem }) {
  return (
    <ul style={{ listStyleType: "none" }} className="item-div">
      {list.map((entry) => {
          return (
            <Item key={entry.id} item={entry} onRemoveItem={() => onRemoveItem(entry)} />
          );
        })
      }
    </ul>
  );
}

export default Items;
