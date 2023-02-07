import React, { ChangeEvent, useState, KeyboardEvent, useRef } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  let [title, setTitle] = useState<string>("");
  let [error, setError] = useState<boolean>(false);
//   let title2 = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

      setTitle(e.currentTarget.value);
      error && setError(false);
    
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem();


  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
    } else {
      setError(true);
    }
    // if (title2.current) {
    //   props.addItem(title2.current.value);
    //   title2.current.value = "";
    // } 

    setTitle("");
  };

  const errorMessages = error && (
    <div style={{ color: "red" }}>Title is required</div>
  );
  const inputErrorClass = error ? "error" : "";

  return (
    <div className="addItemForm">
      <input
        // ref={title2}
        className={inputErrorClass}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <button onClick={addItem}>+</button>
      {errorMessages}
    </div>
  );
};

export default AddItemForm;