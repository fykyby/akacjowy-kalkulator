import { useRef } from "react";
import "../styles/Modal.css";

interface Props {
  element: React.ReactNode;
  hide(): void;
}

export default function Modal(props: Props): JSX.Element {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="Modal"
      onClick={(e) => {
        if (e.target !== ref.current) return;
        props.hide();
      }}
    >
      {props.element}
    </div>
  );
}
