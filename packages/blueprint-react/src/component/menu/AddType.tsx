import { useState } from "react";

interface IProps {
  onCancel?: () => void;
  onConfirm?: (name: string) => void;
}
const AddType = (props: IProps) => {
  const { onCancel, onConfirm } = props;
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => {
          onConfirm && onConfirm(name);
          setName("");
        }}
      >
        confirm
      </div>
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => {
          onCancel && onCancel();
        }}
      >
        cancel
      </div>
    </div>
  );
};

export default AddType;
