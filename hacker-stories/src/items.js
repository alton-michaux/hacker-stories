import Item from "./Item";

function Items({ list, onRemoveItem }) {
  if (list.length === 0) return
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
