import { useEffect, useState } from "react";
import List from "./components/List";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import "./styles/App.css";

// const os = require("os");
// const fs = window.require("fs");

type Page = "List" | "Calculator" | "Products";

export interface ProductInt {
  name: string;
  price: number;
  rabat: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("List");
  const [products, setProducts] = useState<Array<ProductInt>>([
    {
      name: "test1",
      price: 12,
      rabat: 3,
    },
  ]);

  const PageObj = {
    List: <List />,
    Calculator: undefined,
    Products: <Products products={products} />,
  };

  // useEffect(() => {
  //   const home = os.homedir();
  //   const filePath = home + "/AkacjowyKalkulator/produkty.json";
  //   if (fs.existsSync(filePath)) {
  //     const file = JSON.parse(fs.readFile(filePath));
  //     console.log(file);
  //   }
  // }, []);

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {PageObj[currentPage]}
    </div>
  );
}
