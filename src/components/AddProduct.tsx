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
}

export default function AddProduct(props: Props): JSX.Element {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rabat, setRabat] = useState<string>("");

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setPrice(props.data.price.toString());
      setRabat(props.data.rabat.toString());
    }
  }, []);

  function add() {
    if (name === "" || price === "" || rabat === "") return;

    const newProduct: ProductInt = {
      name: name,
      price: parseFloat(price),
      rabat: parseFloat(rabat),
      index: 999,
      id:
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36),
    };
    const newArr = [...props.products];
    newArr.push(newProduct);
    newArr.forEach((item, index) => {
      item.index = index;
    });
    props.setProducts(newArr);
    props.hide();
  }

  function edit() {
    if (name === "" || price === "" || rabat === "" || !props.data) return;

    const newProduct: ProductInt = {
      name: name,
      price: parseFloat(price),
      rabat: parseFloat(rabat),
      id: props.data.id,
      index: props.data.index,
    };
    const newArr = [...props.products];
    newArr[props.data.index] = newProduct;
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
        <button onClick={props.editMode ? edit : add}>
          <CheckSquare color="black" />
        </button>
      </div>
    </div>
  );
}
