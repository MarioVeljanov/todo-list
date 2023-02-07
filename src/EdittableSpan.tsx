import React, { ChangeEvent, FC, useState } from 'react';

type EdittableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

const EdittableSpan: FC<EdittableSpanType> = (props) => {
    let [title, setTitle] = useState<string>(props.title);
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    };

      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
 
      };

    return (
        editMode
        ? <input autoFocus onBlur={offEditMode} value={title} onChange={onChangeHandler}/>
        : <span onDoubleClick={onEditMode} >{props.title} </span>
    );
};

export default EdittableSpan;