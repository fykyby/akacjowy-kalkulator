import "../styles/AddProduct.css";
import { CheckSquare, XSquare } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { ProductInt } from "../App";

interface Props {
  hide(): void;
  setProducts(products: Array<ProductInt>): void;
  products: Array<ProductInt>;
  editMode?: boolean;
  data?: ProductInt;
  index?: number;
}

export default function AddProduct(props: Props): JSX.Element {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [rabat, setRabat] = useState<number>(0);

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setPrice(props.data.price);
      setRabat(props.data.rabat);
    }
  }, []);

  function add() {
    if (name === "" || isNaN(price) || isNaN(rabat)) return;

    const newProduct: ProductInt = {
      name: name,
      price: price,
      rabat: rabat,
      id:
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36),
    };
    const newArr = [...props.products];
    newArr.push(newProduct);

    props.setProducts(newArr);
    props.hide();
  }

  function edit() {
    if (
      name === "" ||
      isNaN(price) ||
      isNaN(rabat) ||
      !props.data ||
      !props.index
    )
      return;

    const newProduct: ProductInt = {
      name: name,
      price: price,
      rabat: rabat,
      id: props.data.id,
    };
    const newArr = [...props.products];
    newArr[props.index] = newProduct;
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
            setPrice(parseFloat(e.target.value));
          }}
          className="price"
          type="number"
          placeholder="Cena (za m)"
        />
        <input
          value={rabat}
          onChange={(e) => {
            setRabat(parseFloat(e.target.value));
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
        <button onClick={props.editMode ? edit : add}>
          <CheckSquare color="black" />
        </button>
      </div>
    </div>
  );
}
