import "../styles/Products.css";
import Product from "./Product";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt } from "../App";
import { useState } from "react";
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

  function saveProducts() {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.set("produkty", props.products);
  }

  return (
    <div className="Products">
      <div className="header">
        <div>Produkty</div>
        <button onClick={saveProducts}>Zapisz</button>
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
