import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { List, CalculatorFill, TagsFill } from "react-bootstrap-icons";

interface Props {
  currentPage: any;
  setCurrentPage(newPage: any): void;
}

export default function Navbar(props: Props): JSX.Element {
  return (
    <nav className="Navbar">
      <img className="logo" src={logo} alt="" />
      <div className="buttons">
        <button
          onClick={() => props.setCurrentPage("List")}
          className={props.currentPage === "List" ? "active" : ""}
        >
          <TagsFill />
        </button>
        {/* <button
          onClick={() => props.setCurrentPage("Calculator")}
          className={props.currentPage === "Calculator" ? "active" : ""}
          disabled
        >
          <CalculatorFill />
        </button> */}
        <button
          onClick={() => props.setCurrentPage("Products")}
          className={props.currentPage === "Products" ? "active" : ""}
        >
          <List />
        </button>
      </div>
    </nav>
  );
}
