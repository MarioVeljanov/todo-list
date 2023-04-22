import { Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { memo } from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
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
    <div style={{ color: "rgb(206, 45, 34)" }}>Title is required</div>
  );
  const inputErrorClass = error ? "error" : "";

  return (
    <>
      <div className="addItemForm">
        <TextField
          id="standard-basic"
          variant="standard"
          label={"Type value"}
          error={!!error}
          // helperText={error && "Title is requred"}
          // ref={title2}
          className={inputErrorClass}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <IconButton onClick={addItem}>
          <AddIcon/>
        </IconButton>
      </div>
      {errorMessages}
    </>
  );
});

export default AddItemForm;