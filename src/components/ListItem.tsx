import "../styles/ListItem.css";
import { Trash } from "react-bootstrap-icons";
import { ProductInt, Item } from "../App";
import { useState, useEffect } from "react";

interface Props {
  products: Array<ProductInt>;
  id: number;
  deleteItem(id: number): void;
  setItems(itemArr: Array<Item>): void;
  items: Array<Item>;
  rabat: number;
}

export default function ListItem(props: Props): JSX.Element {
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    const item = props.items[props.id];
    setFinalPrice(item.finalPrice);
    setAmount(item.amount);
    setVolume(item.volume);
    if (item.selectedProductId >= props.products.length) {
      setSelectedProductId(0);
    } else {
      setSelectedProductId(item.selectedProductId);
    }
  }, [props.items]);

  // useEffect(() => {
  //   if (props.products.length === 0) return;
  //   const selectedProduct = props.products[selectedProductId];
  //   if (volume === "") {
  //     setFinalPrice("0.00");
  //     return;
  //   } else {
  //     let newAmount;
  //     if (amount === "") {
  //       newAmount = "0";
  //     } else {
  //       newAmount = amount;
  //     }
  //     let newPrice = selectedProduct.price * parseFloat(volume);
  //     if (parseFloat(volume) >= props.products[selectedProductId].rabat) {
  //       newPrice = newPrice - newPrice * (props.rabat / 100);
  //     }
  //     newPrice = newPrice * parseInt(newAmount);
  //     setFinalPrice(newPrice.toFixed(2));
  //   }
  // }, [selectedProductId, volume, props.products, amount]);

  useEffect(() => {
    const selectedProduct = props.products[selectedProductId];

    let newPrice = selectedProduct.price * volume;
    if (volume >= props.products[selectedProductId].rabat) {
      newPrice = newPrice - newPrice * (props.rabat / 100);
    }
    newPrice = newPrice * amount;

    if (!isNaN(newPrice)) {
      setFinalPrice(newPrice);
    } else {
      setFinalPrice(0);
    }

    const newArr = [...props.items];
    const item = newArr[props.id];
    item.amount = amount;
    item.volume = volume;
    item.selectedProductId = selectedProductId;
    item.finalPrice = newPrice;
    props.setItems(newArr);
  }, [amount, volume, selectedProductId]);

  return (
    <div className="ListItem">
      <div className="left">
        <select
          value={selectedProductId}
          className="product"
          onChange={(e: any) => {
            setSelectedProductId(parseInt(e.target.value));
          }}
        >
          {props.products.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div className="bottom">
          <div className="volume">
            <input
              type="number"
              value={volume}
              onChange={(e: any) => {
                setVolume(e.target.value);
              }}
            />
            <span>
              m<sup>3</sup>
            </span>
          </div>
          <div className="amount">
            <span>x</span>
            <input
              type="number"
              value={amount}
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <button
          className="deleteBtn"
          onClick={() => props.deleteItem(props.id)}
        >
          <Trash color="black" />
        </button>
        <div className="price">{finalPrice.toFixed(2)} zł</div>
      </div>
    </div>
  );
}
