import "../styles/List.css";
import ListItem from "./ListItem";
import { PlusSquare } from "react-bootstrap-icons";

export default function List(): JSX.Element {
  return (
    <div className="List">
      <div className="finalInfo">
        <div className="finalPrice">1234 zł</div>
      </div>
      <div className="itemList">
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
      <div className="addBtn">
        <button>
          <PlusSquare color="black" />
        </button>
      </div>
    </div>
  );
}
