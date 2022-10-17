import "../styles/List.css";
import ListItem from "./ListItem";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt } from "../App";

interface Props {
  products: Array<ProductInt>;
}

export default function List(props: Props): JSX.Element {
  return (
    <div className="List">
      <div className="finalInfo">
        <div className="finalPrice">1234 zł</div>
      </div>
      <div className="itemList">
        <ListItem products={props.products} />
      </div>
      <div className="addBtn">
        <button>
          <PlusSquare color="black" />
        </button>
      </div>
    </div>
  );
}
