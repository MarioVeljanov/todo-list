import React, { ChangeEvent, memo, useCallback } from 'react';
import { TasksType } from './TodoLIst';
import { IconButton } from '@mui/material';
import EdittableSpan from './EdittableSpan';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Checkbox } from '@material-ui/core';

export type TaskPropsType = {
  task: TasksType;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, cheked: boolean) => void;
  changeTaskTitle: (taskId: string, title: string) => void;
};
const Task = memo((props: TaskPropsType) => {
    let removeTask = () =>{
        props.removeTask(props.task.id)
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,e.currentTarget.checked)
    };

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }, [props.changeTaskTitle, props.task.id]);
    return (
      <div className={(props.task.isDone && "task_done") || "task"}>
        <Checkbox onChange={changeTaskStatus} checked={props.task.isDone} />

        <EdittableSpan title={props.task.title} changeTitle={changeTaskTitle} />
        <IconButton aria-label="delete-task" onClick={removeTask}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    );
});

export default Task;   