import "../styles/AddProduct.css";
import { CheckSquare, XSquare } from "react-bootstrap-icons";
import { useState } from "react";
import { ProductInt } from "../App";

interface Props {
  hide(): void;
  setProducts(products: Array<ProductInt>): void;
  products: Array<ProductInt>;
}

export default function AddProduct(props: Props): JSX.Element {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rabat, setRabat] = useState<string>("");

  function add() {
    if (name === "" || price === "" || rabat === "") return;

    const newProduct: ProductInt = {
      name: name,
      price: parseInt(price),
      rabat: parseInt(rabat),
      id: undefined,
    };
    const newArr = [...props.products];
    newArr.push(newProduct);
    newArr.forEach((item, index) => {
      item.id = index;
    });
    props.setProducts(newArr);

    props.hide();
  }

  return (
    <div className="AddProduct">
      <div className="top">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="name"
          type="text"
          placeholder="Nazwa produktu"
          spellCheck="false"
        />
        <input
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="price"
          type="number"
          placeholder="Cena (za m)"
        />
        <input
          value={rabat}
          onChange={(e) => {
            setRabat(e.target.value);
          }}
          className="rabat"
          type="number"
          placeholder="Rabat (od m)"
        />
      </div>
      <div className="bottom">
        <button onClick={props.hide}>
          <XSquare color="black" />
        </button>
        <button onClick={add}>
          <CheckSquare color="black" />
        </button>
      </div>
    </div>
  );
}
