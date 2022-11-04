import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import List from "./components/List";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import "./styles/App.css";

const os = require("os");
const storage = window.require("electron-json-storage");

export type Page = "List" | "Calculator" | "Products";

export interface ProductInt {
  name: string;
  price: number;
  rabat: number;
  id: string;
}

export interface Item {
  finalPrice: number;
  rabat: number;
  volume: number;
  selectedProductId: string;
}

export interface CaluclatorData {
  mm: number;
  cm: number;
  p1: number;
  p2: number;
  p3: number;
  pAmount: number;
  w1: number;
  w2: number;
  wAmount: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("List");
  const [products, setProducts] = useState<Array<ProductInt>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [calculatorData, setCalculatorData] = useState<CaluclatorData>({
    mm: 0,
    cm: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    pAmount: 1,
    w1: 0,
    w2: 0,
    wAmount: 1,
  });

  const PageObj = {
    List: <List products={products} items={items} setItems={setItems} />,
    Calculator: (
      <Calculator
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    ),
    Products: <Products products={products} setProducts={setProducts} />,
  };

  useEffect(() => {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.get("data", (error: any, data: any) => {
      if (!Array.isArray(data.produkty)) {
        setProducts([]);
      } else {
        setProducts(data.produkty);
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
