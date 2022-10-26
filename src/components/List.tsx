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
    const newElements = props.items.map((item, index) => {
      return (
        <ListItem
          products={props.products}
          index={index}
          deleteItem={deleteItem}
          setItems={props.setItems}
          items={props.items}
          key={index}
          rabat={props.rabat}
        />
      );
    });
    setItemElements([...newElements].reverse());

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
      amount: 1,
      finalPrice: 0,
      volume: 0,
      selectedProductId: props.products[0].id,
    });
    props.setItems(newArr);
  }

  function deleteItem(index: number) {
    const newArr = [...props.items];
    newArr.splice(index, 1);
    // newArr.forEach((item, index) => {
    //   item.index = index;
    // });
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
      <div className="addBtn">
        <button onClick={addItem}>
          <PlusSquare color="black" />
        </button>
      </div>
      <div className="itemList">{itemElements}</div>
    </div>
  );
}
