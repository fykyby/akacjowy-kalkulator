import "../styles/Product.css";
import { Trash, PencilSquare, ArrowUp, ArrowDown } from "react-bootstrap-icons";
import { ProductInt } from "../App";
import { useState } from "react";
import Modal from "./Modal";
import AddProduct from "./AddProduct";

interface Props {
  data: ProductInt;
  products: Array<ProductInt>;
  setProducts(products: Array<ProductInt>): void;
  moveUp(id: number): void;
  moveDown(id: number): void;
}

export default function Product(props: Props): JSX.Element {
  const [editWindowVisible, setEditWindowVisible] = useState(false);

  function deleteProduct() {
    const newArr = [...props.products];
    newArr.splice(props.data.index, 1);
    newArr.forEach((item, index) => {
      item.index = index;
    });
    props.setProducts(newArr);
  }

  return (
    <div className="Product">
      <div className="move">
        <button
          onClick={() => props.moveUp(props.data.index)}
          className="upBtn"
        >
          <ArrowUp color="black" />
        </button>
        <button
          onClick={() => props.moveDown(props.data.index)}
          className="downBtn"
        >
          <ArrowDown color="black" />
        </button>
      </div>
      <div className="name">{props.data.name}</div>
      <div className="price">{props.data.price}</div>
      <div className="rabat">{props.data.rabat}</div>
      <div className="buttons">
        <div className="edit">
          <button onClick={() => setEditWindowVisible(true)}>
            <PencilSquare color="black" />
          </button>
        </div>
        <div className="delete">
          <button onClick={deleteProduct}>
            <Trash color="black" />
          </button>
        </div>
      </div>
      {editWindowVisible ? (
        <Modal
          element={
            <AddProduct
              hide={() => {
                setEditWindowVisible(false);
              }}
              setProducts={props.setProducts}
              products={props.products}
              editMode
              data={props.data}
            />
          }
          hide={() => {
            setEditWindowVisible(false);
          }}
        />
      ) : null}
    </div>
  );
}
