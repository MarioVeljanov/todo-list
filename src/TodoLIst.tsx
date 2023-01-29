import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import { FilterValuesTupe } from "./App";

type TodoListPoropType = {
  title: string;
  filter: FilterValuesTupe
  tasks: Array<TasksType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesTupe) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void
};


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

const TodoLIst: React.FC<TodoListPoropType> = (props: TodoListPoropType) => {
    let tasksList;
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)
    // const ref = useRef<ClassAttributes<HTMLInputElement>>(null);
    if(props.tasks.length === 0) {
        tasksList = <span>Your task list is empty</span>;
    } else {
        tasksList = props.tasks.map((task: TasksType) => {
            let removeTask = () => props.removeTask(task.id);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
              <li key={task.id} className={task.isDone && 'task_done' || 'task'}>
                <input
                  onChange={changeTaskStatus}
                  type="checkbox"
                  checked={task.isDone}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
              </li>
            );

         })
    }
    
    const addTask = () => {
      if (title.trim() !== "") {
        props.addTask(title)
      } else {
        setError(true)
        
      }
      
      setTitle('')
      
      
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
      setError(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    
    // const onClickHandlerAll = () => props.changeFilter("all")
    // const onClickHandlerActive = () => props.changeFilter("active");
    // const onClickHandlerComplited = () => props.changeFilter("completed")

    const handlerCreater = (filter: FilterValuesTupe) => () => props.changeFilter(filter)

    const errorMessages = error && <div style={{color: 'red'}}>Title is required</div>
    const inputErrorClass = error ? "error" : ""
    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input
            className={inputErrorClass}
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
          />
          <button onClick={addTask}>+</button>
          {errorMessages}
        </div>
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