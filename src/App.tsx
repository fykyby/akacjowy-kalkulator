import { useEffect, useState } from "react";
import List from "./components/List";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import "./styles/App.css";

// const fs = window.require("fs");
const os = require("os");
const storage = window.require("electron-json-storage");

type Page = "List" | "Calculator" | "Products";

export interface ProductInt {
  name: string;
  price: number;
  rabat: number;
  id: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("List");
  const [products, setProducts] = useState<Array<ProductInt>>([]);

  const PageObj = {
    List: <List />,
    Calculator: undefined,
    Products: <Products products={products} setProducts={setProducts} />,
  };

  useEffect(() => {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.get("produkty", (error: any, data: any) => {
      if (error) throw error;
      if (!Array.isArray(data)) {
        setProducts([]);
      } else {
        setProducts(data);
      }
    });
  }, [currentPage]);

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {PageObj[currentPage]}
    </div>
  );
}
