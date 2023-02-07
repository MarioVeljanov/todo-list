import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesTupe } from "./App";
import EdittableSpan from "./EdittableSpan";

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
              <li key={task.id} className={task.isDone && 'task_done' || 'task'}>
                <input
                  onChange={changeTaskStatus}
                  type="checkbox"
                  checked={task.isDone}
                />
                {/* <span>{task.title}</span> */}
                <EdittableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
              </li>
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
        <h3>
          <EdittableSpan title={props.title} changeTitle={changeTodoLIstTitle}/>
          <button onClick={onClickRemoveTodoListHandler}>X</button>
        </h3>

        <AddItemForm addItem={addTask} />
        <ul>{tasksList}</ul>
        <div>
          <button
            className={props.filter === "all" ? "active_btn" : ""}
            onClick={handlerCreater("all")}
          >
            All
          </button>
          <button
            className={props.filter === "active" ? "active_btn" : ""}
            onClick={handlerCreater("active")}
          >
            Active
          </button>
          <button
            className={props.filter === "completed" ? "active_btn" : ""}
            onClick={handlerCreater("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    );
}


export default TodoLIst;