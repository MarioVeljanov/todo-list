import React from "react";
import { FilterValuesTupe } from "./App";

type TodoListPoropType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesTupe) => void
}


export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
};

const TodoLIst: React.FC<TodoListPoropType> = (props: TodoListPoropType) => {
    let tasksList;
    
    if(props.tasks.length === 0) {
        // tasksList.push(<span>Your task list is empty</span>)
        tasksList = <span>Your task list is empty</span>;
    } else {
        tasksList = props.tasks.map((task: TasksType) => {
            let removeTask = props.removeTask;
            return (
              <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
              </li>
            );

         })
    }

    
    // props.tasks.forEach((element: TasksType) => {
    //   tasksList.push(
    //     <li>
    //       <input type="checkbox" checked={element.isDone} />
    //       <span>{element.title}</span>
    //     </li>
    //   );
    // });
    
    

    let changeFilter = props.changeFilter
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => changeFilter("all")}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
        
    );
}


export default TodoLIst;