import "../styles/Product.css";
import { Trash } from "react-bootstrap-icons";
import { ProductInt } from "../App";

interface Props {
  data: ProductInt;
}

export default function Product(props: Props): JSX.Element {
  return (
    <tr className="Product">
      <td>{props.data.name}</td>
      <td>{props.data.price}</td>
      <td>{props.data.rabat}</td>
      <td className="deleteCell">
        <button>
          <Trash color="black" />
        </button>
      </td>
    </tr>
  );
}
