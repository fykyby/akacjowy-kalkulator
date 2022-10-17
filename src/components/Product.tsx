import "../styles/Product.css";
import { Trash } from "react-bootstrap-icons";
import { ProductInt } from "../App";

interface Props {
  data: ProductInt;
  products: Array<ProductInt>;
  setProducts(products: Array<ProductInt>): void;
}

export default function Product(props: Props): JSX.Element {
  function deleteProduct() {
    const newArr = [...props.products];
    newArr.splice(props.data.id, 1);
    newArr.forEach((item, index) => {
      item.id = index;
    });
    props.setProducts(newArr);
  }

  return (
    <div className="Product">
      <div className="name">{props.data.name}</div>
      <div className="price">{props.data.price}</div>
      <div className="rabat">{props.data.rabat}</div>
      <div className="delete">
        <button onClick={deleteProduct}>
          <Trash color="black" />
        </button>
      </div>
    </div>
  );
}
