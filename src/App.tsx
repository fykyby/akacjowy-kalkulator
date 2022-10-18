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
  id: number;
}

export interface Item {
  id: number;
  finalPrice: number;
  amount: number;
  volume: number;
  selectedProductId: number;
}

export interface CaluclatorData {
  mm: number;
  cm: number;
  p1: number;
  p2: number;
  p3: number;
  w1: number;
  w2: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("List");
  const [products, setProducts] = useState<Array<ProductInt>>([]);
  const [rabat, setRabat] = useState<number>(0);
  const [items, setItems] = useState<Array<Item>>([]);
  const [calculatorData, setCalculatorData] = useState<CaluclatorData>({
    mm: 0,
    cm: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    w1: 0,
    w2: 0,
  });

  const PageObj = {
    List: (
      <List
        products={products}
        rabat={rabat}
        items={items}
        setItems={setItems}
      />
    ),
    Calculator: (
      <Calculator
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    ),
    Products: (
      <Products products={products} setProducts={setProducts} rabat={rabat} />
    ),
  };

  useEffect(() => {
    storage.setDataPath(os.homedir() + "/SwiatAkacji");
    storage.get("data", (error: any, data: any) => {
      if (error) throw error;
      if (!Array.isArray(data.produkty)) {
        setProducts([]);
        setRabat(0);
      } else {
        setProducts(data.produkty);
        setRabat(data.rabat);
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
