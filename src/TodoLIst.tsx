import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import { FilterValuesTupe } from "./App";

type TodoListPoropType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesTupe) => void
    addTask: (title: string) => void
}


export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

const TodoLIst: React.FC<TodoListPoropType> = (props: TodoListPoropType) => {
    let tasksList;
    let [title, setTitle] = useState<string>('')
    // const ref = useRef<ClassAttributes<HTMLInputElement>>(null);
    if(props.tasks.length === 0) {
        tasksList = <span>Your task list is empty</span>;
    } else {
        tasksList = props.tasks.map((task: TasksType) => {
            let removeTask = props.removeTask;
            return (
              <li key={task.id}>
                <input readOnly type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
              </li>
            );

         })
    }
    
    const addTask = () => {
      props.addTask(title);
      setTitle((title = ""));
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    
    // const onClickHandlerAll = () => props.changeFilter("all")
    // const onClickHandlerActive = () => props.changeFilter("active");
    // const onClickHandlerComplited = () => props.changeFilter("completed")

    const handlerCreater = (filter: FilterValuesTupe) => () => props.changeFilter(filter)
    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input 
          value={title} 
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}/>
          <button onClick={addTask}>+</button>
        </div>
        <ul>{tasksList}</ul>
        <div>
          <button onClick={handlerCreater("all")}>All</button>
          <button onClick={handlerCreater("active")}>Active</button>
          <button onClick={handlerCreater("completed")}>Completed</button>
        </div>
      </div>
    );
}


export default TodoLIst;