import "../styles/Products.css";
import Product from "./Product";
import { PlusSquare } from "react-bootstrap-icons";
import { ProductInt } from "../App";

// const os = require("os");
// const fs = window.require("fs");
// const path = window.require("path");

interface Props {
  products: Array<ProductInt>;
}

export default function Products(props: Props): JSX.Element {
  function saveProducts() {
    // const home = os.homedir();
    // const filePath = "/home/fykyby/AkacjowyKalkulator";
    // const filePath = home + "/AkacjowyKalkulator/produkty.json";
    // const filePath = path.join(__dirname, "/produkty.json");
    // fs.writeFileSync(filePath, JSON.stringify(props.products));
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
        <button>
          <PlusSquare color="black" />
        </button>
      </div>
    </div>
  );
}
