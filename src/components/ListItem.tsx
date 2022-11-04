import "../styles/ListItem.css";
import { Trash } from "react-bootstrap-icons";
import { ProductInt, Item } from "../App";
import { useState, useEffect } from "react";

interface Props {
  products: Array<ProductInt>;
  index: number;
  deleteItem(index: number): void;
  setItems(itemArr: Array<Item>): void;
  items: Array<Item>;
}

export default function ListItem(props: Props): JSX.Element {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [volume, setVolume] = useState<number>(1);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [rabat, setRabat] = useState<number>(0);

  useEffect(() => {
    const item = props.items[props.index];
    setFinalPrice(item.finalPrice);
    setRabat(item.rabat);
    setVolume(item.volume);
    setSelectedProductId(item.selectedProductId);
  }, [props.items]);

  useEffect(() => {
    const selectedProductIndex = props.products.findIndex((el) => {
      return el.id === selectedProductId;
    });

    const selectedProduct = props.products[selectedProductIndex];

    if (!selectedProduct) {
      const newArr = [...props.items];
      const item = newArr[props.index];
      item.rabat = 0;
      item.volume = 0;
      item.finalPrice = 0;

      props.setItems(newArr);
      return;
    }

    let newPrice = selectedProduct.price * volume;
    if (volume >= props.products[selectedProductIndex].rabat) {
      newPrice = newPrice - newPrice * (rabat / 100);
    }

    if (!isNaN(newPrice)) {
      setFinalPrice(newPrice);
    } else {
      setFinalPrice(0);
    }
    const newArr = [...props.items];
    const item = newArr[props.index];

    item.rabat = rabat;
    item.volume = volume;
    item.selectedProductId = selectedProductId;
    item.finalPrice = newPrice;

    props.setItems(newArr);
  }, [rabat, volume, selectedProductId]);

  return (
    <div className="ListItem">
      <div className="left">
        <select
          value={selectedProductId}
          className="product"
          onChange={(e: any) => {
            setSelectedProductId(e.target.value);
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
            <span>%</span>
            <input
              type="number"
              value={rabat}
              onChange={(e: any) => {
                if (e.target.value > 100) setRabat(100);
                else if (e.target.value < 0) {
                  setRabat(0);
                } else {
                  setRabat(e.target.value);
                }
              }}
              max={100}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <button
          className="deleteBtn"
          onClick={() => props.deleteItem(props.index)}
        >
          <Trash color="black" />
        </button>
        <div className="price">{finalPrice.toFixed(2)} zł</div>
      </div>
    </div>
  );
}
