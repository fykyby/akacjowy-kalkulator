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
  rabat: number;
}

export default function Products(props: Props): JSX.Element {
  const [addProductWindowVisible, setAddProductWindowVisible] = useState(false);
  const [rabatInput, setRabatInput] = useState<number>(0);

  useEffect(() => {
    setRabatInput(props.rabat);
  }, []);

  function save() {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.set("data", {
      produkty: props.products,
      rabat: rabatInput,
    });
  }

  return (
    <div className="Products">
      <div className="header">
        <div>Produkty</div>
        <button onClick={save}>Zapisz</button>
      </div>
      <div className="rabatInputContainer">
        Rabat
        <input
          type="number"
          value={rabatInput}
          onChange={(e) => {
            setRabatInput(parseInt(e.target.value));
          }}
        />
        %
      </div>
      <div className="columns">
        <div className="produktColumn">Produkt</div>
        <div className="cenaColumn">
          Cena za m<sup>3</sup> (zł)
        </div>
        <div className="rabatColumn">
          Rabat ({`>`}m<sup>3</sup>)
        </div>
        <div className="deleteColumn"></div>
      </div>
      <div className="productList">
        {props.products.map((data, index) => {
          return (
            <Product
              data={data}
              setProducts={props.setProducts}
              products={props.products}
              key={index}
            />
          );
        })}
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
