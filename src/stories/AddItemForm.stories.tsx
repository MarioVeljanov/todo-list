import type { Meta, StoryObj } from '@storybook/react';
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from './Button';
import AddItemForm, { AddItemFormPropsType } from '../AddItemForm';
import { IconButton, TextField } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem:  {
      description: "Button clicked inside form",
      action: "clicked"
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  
};

export const AddItemFormwithErrorStory = (args: AddItemFormPropsType) => {
  let [title, setTitle] = useState<string>("");
  let [error, setError] = useState<boolean>(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(false);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addItem();

  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title);
    } else {
      setError(true);
    }

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
          <AddIcon />
        </IconButton>
      </div>
      {errorMessages}
    </>
  );
};



