import "../styles/List.css";
import ListItem from "./ListItem";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt, Item } from "../App";
import { useState, useEffect } from "react";

interface Props {
  products: Array<ProductInt>;
  rabat: number;
  items: Array<Item>;
  setItems(items: Array<Item>): void;
}

export default function List(props: Props): JSX.Element {
  const [finalPrice, setFinalPrice] = useState<string>("0.00");
  const [itemElements, setItemElements] = useState<Array<JSX.Element>>();

  useEffect(() => {
    const newElements = props.items.map((item) => {
      return (
        <ListItem
          products={props.products}
          id={item.id}
          deleteItem={deleteItem}
          setItems={props.setItems}
          items={props.items}
          key={item.id}
          rabat={props.rabat}
        />
      );
    });
    setItemElements([...newElements]);

    let newPrice = 0;
    props.items.forEach((item) => {
      if (item.finalPrice === undefined) return;
      newPrice += item.finalPrice;
    });
    setFinalPrice(newPrice.toFixed(2));
  }, [props.items]);

  function addItem() {
    const newArr = [...props.items];
    newArr.push({
      id: newArr.length,
      amount: 0,
      finalPrice: 0,
      selectedProductId: 0,
      volume: 0,
    });
    props.setItems(newArr);
  }

  function deleteItem(id: number) {
    const newArr = [...props.items];
    newArr.splice(id, 1);
    newArr.forEach((item, index) => {
      item.id = index;
    });
    props.setItems(newArr);
  }

  function resetItems() {
    props.setItems([]);
  }

  return (
    <div className="List">
      <div className="finalInfo">
        <div className="reset">
          <button onClick={resetItems}>Reset</button>
        </div>
        <div className="finalPrice">{finalPrice} zł</div>
      </div>
      <div className="itemList">{itemElements}</div>
      <div className="addBtn">
        <button onClick={addItem}>
          <PlusSquare color="black" />
        </button>
      </div>
    </div>
  );
}
