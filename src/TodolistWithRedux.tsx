import { Box, Button, Grid, IconButton } from "@mui/material";
import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesTupe } from "./App";
import EdittableSpan from "./EdittableSpan";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Checkbox } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AppRootType } from "./store/store";
import { useDispatch } from "react-redux";
import { addTaskAC, changeStatusAC, changeTaskTitlesAC, RemoveTaskAC } from "./store/tasks-reducer";
import { ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC } from "./store/todolist-reducer";

type TodoListPoropType = {
  todoListId: string
  title: string;
  filter: FilterValuesTupe;

  
};


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

const TodoListWithRedux: React.FC<TodoListPoropType> = (props: TodoListPoropType) => {
  let tasks = useSelector<AppRootType, TasksType[]>((state) => state.tasks[props.todoListId]);

  if (props.filter === "active") {
    tasks = tasks.filter((tasks) => tasks.isDone === false);
  }

  if (props.filter === "completed") {
    tasks = tasks.filter((tasks) => tasks.isDone === true);
  }

  const dispatch = useDispatch()
    let tasksList;
    if(tasks.length === 0) {
        tasksList = <span>Your task list is empty</span>;
    } else {
        tasksList = tasks.map((task: TasksType) => {
            let removeTask = () => dispatch(RemoveTaskAC(task.id, props.todoListId));;
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeStatusAC(task.id, e.currentTarget.checked, props.todoListId));
            }

            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitlesAC(task.id, title, props.todoListId));
            }
            return (
              <div key={task.id} className={task.isDone && 'task_done' || 'task'}>
                <Checkbox
                  onChange={changeTaskStatus}
                  checked={task.isDone}
                />
               
                <EdittableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <IconButton aria-label="delete-task" onClick={removeTask}>
                  <DeleteOutlineIcon/>
                </IconButton>
              </div>
            );

         })
    }

    const handlerCreater = (filter: FilterValuesTupe) => () => dispatch(ChangeTodoListFilterAC(filter, props.todoListId));

    const onClickRemoveTodoListHandler = () => {
      let action = RemoveTodoListAC(props.todoListId);
      dispatch(action);
    }

    const addTask = (title: string) => {
         dispatch(addTaskAC(title, props.todoListId));
    }



    const changeTodoLIstTitle = (title: string) => {
      dispatch(ChangeTodoListTitleAC(title, props.todoListId));
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


export default TodoListWithRedux;