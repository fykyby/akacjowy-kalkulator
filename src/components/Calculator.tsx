import { CaluclatorData } from "../App";
import "../styles/Calculator.css";

interface Props {
  calculatorData: CaluclatorData;
  setCalculatorData(data: CaluclatorData): void;
}

export default function Calculator(props: Props): JSX.Element {
  function handleChange(e: any, key: keyof CaluclatorData) {
    const newObj = { ...props.calculatorData };
    newObj[key] = e.target.value;
    props.setCalculatorData(newObj);
  }

  function getPVol() {
    const val =
      props.calculatorData.p1 *
      props.calculatorData.p2 *
      props.calculatorData.p3 *
      props.calculatorData.pAmount;
    if (isNaN(val)) {
      return 0;
    } else {
      return val.toFixed(6);
    }
  }

  function getWVol() {
    const val =
      Math.PI *
      (props.calculatorData.w1 * props.calculatorData.w1) *
      props.calculatorData.w2;
    if (isNaN(val)) {
      return 0;
    } else {
      return val.toFixed(6);
    }
  }

  return (
    <div className="Calculator">
      <div className="topContainer">
        <div className="mmToM">
          <input
            onChange={(e) => {
              handleChange(e, "mm");
            }}
            value={props.calculatorData.mm}
            type="number"
          />
          mm = {(props.calculatorData.mm / 1000).toFixed(3)} m
        </div>
        <div className="cmToM">
          <input
            onChange={(e) => {
              handleChange(e, "cm");
            }}
            value={props.calculatorData.cm}
            type="number"
          />
          cm = {(props.calculatorData.cm / 100).toFixed(3)} m
        </div>
      </div>
      <div className="prostopadloscian">
        <div className="title">Prostopadłościan</div>
        <div className="inputs">
          <div className="inputContainer">
            <span>
              <input
                onChange={(e) => {
                  handleChange(e, "p1");
                }}
                value={props.calculatorData.p1}
                type="number"
                placeholder="Szerokość"
              />
              m
            </span>
            <span>
              <input
                onChange={(e) => {
                  handleChange(e, "p2");
                }}
                value={props.calculatorData.p2}
                type="number"
                placeholder="Grubość"
              />
              m
            </span>
            <span>
              <input
                onChange={(e) => {
                  handleChange(e, "p3");
                }}
                value={props.calculatorData.p3}
                type="number"
                placeholder="Długość"
              />
              m
            </span>
          </div>
          <span>
            x{" "}
            <input
              onChange={(e) => {
                handleChange(e, "pAmount");
              }}
              value={props.calculatorData.pAmount}
              type="number"
            />
          </span>
          <div className="finalVal">
            = {getPVol()} m<sup>3</sup>
          </div>
        </div>
      </div>
      <div className="walec">
        <div className="title">Walec</div>
        <div className="inputs">
          <div className="inputContainer">
            <span>
              <input
                onChange={(e) => {
                  handleChange(e, "w1");
                }}
                value={props.calculatorData.w1}
                type="number"
                placeholder="Promień"
              />
              m
            </span>
            <span>
              <input
                onChange={(e) => {
                  handleChange(e, "w2");
                }}
                value={props.calculatorData.w2}
                type="number"
                placeholder="Długość"
              />
              m
            </span>
          </div>
          <span>
            x{" "}
            <input
              onChange={(e) => {
                handleChange(e, "wAmount");
              }}
              value={props.calculatorData.wAmount}
              type="number"
            />
          </span>
          <div className="finalVal">
            = {getWVol()} m<sup>3</sup>
          </div>
        </div>
      </div>
    </div>
  );
}
