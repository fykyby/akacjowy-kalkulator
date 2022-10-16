import "../styles/ListItem.css";
import { Trash } from "react-bootstrap-icons";

export default function ListItem(): JSX.Element {
  return (
    <div className="ListItem">
      <div className="left">
        <select className="product">
          <option>Item1</option>
          <option>Item2</option>
        </select>
        <div className="amount">
          <input type="number" />
          <span>
            m<sup>3</sup>
          </span>
        </div>
      </div>
      <div className="right">
        <button className="deleteBtn">
          <Trash color="black" />
        </button>
        <div className="price">1234 zł</div>
      </div>
    </div>
  );
}
