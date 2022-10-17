import "../styles/Modal.css";

interface Props {
  element: React.ReactNode;
  hide(): void;
}

export default function Modal(props: Props): JSX.Element {
  return (
    <div
      className="Modal"
      onClick={() => {
        props.hide();
      }}
    >
      {props.element}
    </div>
  );
}
