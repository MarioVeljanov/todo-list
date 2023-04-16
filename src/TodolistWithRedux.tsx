import { IconButton } from "@mui/material";
import React, { ChangeEvent, memo, useCallback, useMemo } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesTupe } from "./App";
import EdittableSpan from "./EdittableSpan";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Checkbox } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AppRootType } from "./store/store";
import { useDispatch } from "react-redux";
import { addTaskAC, changeStatusAC, changeTaskTitlesAC, RemoveTaskAC } from "./store/tasks-reducer";
import { ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC } from "./store/todolist-reducer";
import Task from "./Task";

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

const TodoListWithRedux: React.FC<TodoListPoropType> = memo((props: TodoListPoropType) => {
  let tasks = useSelector<AppRootType, TasksType[]>((state) => state.tasks[props.todoListId]);
  const dispatch = useDispatch();

  const handlerCreaterAll = () => dispatch(ChangeTodoListFilterAC('all', props.todoListId));
  const handlerCreaterActive = () => dispatch(ChangeTodoListFilterAC('active', props.todoListId));
  const handlerCreaterCompleted = () => dispatch(ChangeTodoListFilterAC('completed', props.todoListId));

  useMemo(() => {
    if (props.filter === "active") {
      tasks = tasks.filter((tasks) => tasks.isDone === false);
    }

    if (props.filter === "completed") {
      tasks = tasks.filter((tasks) => tasks.isDone === true);
    }
    return tasks
  }, [props.filter, tasks])


  let removeTask = useCallback((taskId: string) => dispatch(RemoveTaskAC(taskId, props.todoListId)), [props.todoListId]);
  
  const changeTaskStatus = useCallback((taskId: string, checked: boolean) => {
    dispatch(changeStatusAC(taskId, checked, props.todoListId));
  }, [props.todoListId]);

  const changeTaskTitle = useCallback(
    (taskId: string, title: string) => {
      dispatch(changeTaskTitlesAC(taskId, title, props.todoListId));
    },
    [props.todoListId]
  );

  let tasksList;
  if(tasks.length === 0) {
      tasksList = <span>Your task list is empty</span>;
  } else {
      tasksList = tasks.map((task: TasksType) => {
          return (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
            />
          );

        })
    }


 
    const onClickRemoveTodoListHandler = () => {
      let action = RemoveTodoListAC(props.todoListId);
      dispatch(action);
    }

    const addTask = useCallback((title: string) => {
         dispatch(addTaskAC(title, props.todoListId));
    }, [dispatch])



    const changeTodoLIstTitle = useCallback((title: string) => {
      dispatch(ChangeTodoListTitleAC(title, props.todoListId));
    }, [dispatch, props.todoListId])


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
        <ul style={{ paddingLeft: "0px" }}>{tasksList}</ul>
        <div>
          <ButtonWithMemo
            title="All"
            color="inherit"
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={handlerCreaterAll}
          />

          <ButtonWithMemo
            title="Active"
            color="primary"
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={handlerCreaterActive}
          />

          <ButtonWithMemo
            title="Completed"
            color="secondary"
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={handlerCreaterCompleted}
          />
        </div>
      </div>
    );
})


export default TodoListWithRedux;

type ButtonWithMemoPropsType = {
  title: string;
  color: "inherit" | "primary" | "secondary" | "default";
  variant: "text" | "outlined" | "contained";
  onClick: () => void
};

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
  return <Button
            variant={props.variant}
            color={props.color}
            onClick={props.onClick}
          >
            {props.title}
  </Button>
})