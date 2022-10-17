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
    <tr className="Product">
      <td>{props.data.name}</td>
      <td>{props.data.price}</td>
      <td>{props.data.rabat}</td>
      <td className="deleteCell">
        <button onClick={deleteProduct}>
          <Trash color="black" />
        </button>
      </td>
    </tr>
  );
}
