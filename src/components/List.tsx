import "../styles/List.css";
import ListItem from "./ListItem";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt } from "../App";
import { useState, useEffect } from "react";

interface Props {
  products: Array<ProductInt>;
}

export interface Item {
  id: number;
  price?: number;
}

export default function List(props: Props): JSX.Element {
  const [items, setItems] = useState<Array<Item>>([]);
  const [finalPrice, setFinalPrice] = useState<string>("0.00");

  useEffect(() => {
    let newPrice = 0;
    items.forEach((item) => {
      if (item.price === undefined) return;
      newPrice += item.price;
    });
    setFinalPrice(newPrice.toFixed(2));
  }, [items]);

  function addItem() {
    const newArr = [...items];
    newArr.push({ id: newArr.length });
    setItems(newArr);
  }

  function deleteItem(id: number) {
    const newArr = [...items];
    newArr.splice(id, 1);
    newArr.forEach((item, index) => {
      item.id = index;
    });
    setItems(newArr);
  }

  return (
    <div className="List">
      <div className="finalInfo">
        <div className="finalPrice">{finalPrice} zł</div>
      </div>
      <div className="itemList">
        {items.map((item) => {
          return (
            <ListItem
              products={props.products}
              id={item.id}
              deleteItem={deleteItem}
              setItems={setItems}
              items={items}
              key={item.id}
            />
          );
        })}
      </div>
      <div className="addBtn">
        <button onClick={addItem}>
          <PlusSquare color="black" />
        </button>
      </div>
    </div>
  );
}
