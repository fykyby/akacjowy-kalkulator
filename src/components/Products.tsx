import "../styles/Products.css";
import Product from "./Product";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt } from "../App";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import AddProduct from "./AddProduct";

const os = require("os");
const storage = window.require("electron-json-storage");

interface Props {
  products: Array<ProductInt>;
  setProducts(products: Array<ProductInt>): void;
}

export default function Products(props: Props): JSX.Element {
  const [addProductWindowVisible, setAddProductWindowVisible] = useState(false);

  function save() {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.set("data", {
      produkty: props.products,
    });
  }

  function moveUp(id: number) {
    if (id === 0) return;

    const newArr = [...props.products];
    const a = newArr[id - 1];
    newArr[id - 1] = newArr[id];
    newArr[id] = a;
    props.setProducts(newArr);
  }

  function moveDown(id: number) {
    if (id === props.products.length - 1) return;

    const newArr = [...props.products];
    const a = newArr[id + 1];
    newArr[id + 1] = newArr[id];
    newArr[id] = a;
    props.setProducts(newArr);
  }

  return (
    <div className="Products">
      <div className="header">
        <div>Produkty</div>
        <button onClick={save}>Zapisz</button>
      </div>
      <div className="columns">
        <div className="moveColumn"></div>
        <div className="produktColumn">Produkt</div>
        <div className="cenaColumn">
          Cena za m<sup>3</sup> (zł)
        </div>
        <div className="rabatColumn">
          Rabat ({`>`}m<sup>3</sup>)
        </div>
        <div className="buttonsColumn"></div>
      </div>
      <div className="addBtn">
        <button
          onClick={() => {
            setAddProductWindowVisible(true);
          }}
        >
          <PlusSquare color="black" />
        </button>
      </div>
      <div className="productList">
        {props.products.map((data, index) => {
          return (
            <Product
              data={data}
              index={index}
              setProducts={props.setProducts}
              products={props.products}
              key={index}
              moveUp={moveUp}
              moveDown={moveDown}
            />
          );
        })}
      </div>
      {addProductWindowVisible ? (
        <Modal
          element={
            <AddProduct
              hide={() => {
                setAddProductWindowVisible(false);
              }}
              setProducts={props.setProducts}
              products={props.products}
            />
          }
          hide={() => {
            setAddProductWindowVisible(false);
          }}
        />
      ) : null}
    </div>
  );
}
