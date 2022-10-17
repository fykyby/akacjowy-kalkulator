import "../styles/ListItem.css";
import { Trash } from "react-bootstrap-icons";
import { ProductInt } from "../App";
import { useState, useEffect } from "react";

interface Props {
  products: Array<ProductInt>;
}

export default function ListItem(props: Props): JSX.Element {
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [amount, setAmount] = useState<string>("0");
  const [finalPrice, setFinalPrice] = useState<string>("0");

  useEffect(() => {
    if (props.products.length === 0) return;
    const selectedProduct = props.products[selectedProductId];
    if (amount === "") {
      setFinalPrice("0");
      return;
    } else {
      const newPrice = selectedProduct.price * parseFloat(amount);
      setFinalPrice(newPrice.toFixed(2));
    }
  }, [selectedProductId, amount, props.products]);

  return (
    <div className="ListItem">
      <div className="left">
        <select
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
        <div className="amount">
          <input
            type="number"
            value={amount}
            onChange={(e: any) => {
              setAmount(e.target.value);
            }}
          />
          <span>
            m<sup>3</sup>
          </span>
        </div>
      </div>
      <div className="right">
        <button className="deleteBtn">
          <Trash color="black" />
        </button>
        <div className="price">{finalPrice} zł</div>
      </div>
    </div>
  );
}
