import { Box, Button, Grid, IconButton } from "@mui/material";
import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesTupe } from "./App";
import EdittableSpan from "./EdittableSpan";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Checkbox } from "@material-ui/core";

type TodoListPoropType = {
  todoListId: string
  title: string;
  filter: FilterValuesTupe;
  tasks: Array<TasksType>;

  removeTask: (taskId: string, todoListId: string) => void;
  changeFilter: (filter: FilterValuesTupe, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void
  changeTaskTitle: (taskId: string, title:string, todoListId: string) => void
  changeFilterTitle: (title: string, todoListId: string) => void
};


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

const TodoLIst: React.FC<TodoListPoropType> = (props: TodoListPoropType) => {
    let tasksList;
    if(props.tasks.length === 0) {
        tasksList = <span>Your task list is empty</span>;
    } else {
        tasksList = props.tasks.map((task: TasksType) => {
            let removeTask = () => props.removeTask(task.id, props.todoListId);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.todoListId
              );
            }

            const changeTaskTitle = (title: string) => {
              props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
              <div key={task.id} className={task.isDone && 'task_done' || 'task'}>
                <Checkbox
                  onChange={changeTaskStatus}
                  checked={task.isDone}
                />
                {/* <span>{task.title}</span> */}
                <EdittableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <IconButton aria-label="delete-task" onClick={removeTask}>
                  <DeleteOutlineIcon/>
                </IconButton>
              </div>
            );

         })
    }

    const handlerCreater = (filter: FilterValuesTupe) => () => props.changeFilter(filter, props.todoListId);

    const onClickRemoveTodoListHandler = () => props.removeTodoList(props.todoListId)

    const addTask = (title: string) => {
      props.addTask(title, props.todoListId)
    }



    const changeTodoLIstTitle = (title: string) => {
      props.changeFilterTitle(title, props.todoListId);
    }



    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          <EdittableSpan
            title={props.title}
            changeTitle={changeTodoLIstTitle}
          />
          <Button onClick={onClickRemoveTodoListHandler}>
            <DeleteOutlineIcon />
          </Button>
        </h3>

        <AddItemForm addItem={addTask} />
        <ul style={{paddingLeft: "0px"}}>{tasksList}</ul>
        <div>
          <Button
            variant={props.filter === "all" ? "contained" : "text"}
            color={"inherit"}
            onClick={handlerCreater("all")}
          >
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "text"}
            color={"primary"}
            onClick={handlerCreater("active")}
          >
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "text"}
            color={"secondary"}
            onClick={handlerCreater("completed")}
          >
            Completed
          </Button>
        </div>
      </div>
    );
}


export default TodoLIst;