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
      <table className="productList">
        <thead>
          <tr>
            <th className="produktColumn">Produkt</th>
            <th className="cenaColumn">
              Cena za m<sup>3</sup> (zł)
            </th>
            <th className="rabatColumn">
              Rabat ({`>`}m<sup>3</sup>)
            </th>
            <th className="deleteColumn"></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((data, index) => {
            return <Product data={data} key={index} />;
          })}
        </tbody>
      </table>
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
