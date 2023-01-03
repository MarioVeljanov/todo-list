import React from "react";

type TodoListPoropType = {
    title: string
    tasks: Array<TasksType>
}


export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
};

const TodoLIst = (props: TodoListPoropType) => {
    let tasksList;
    if(props.tasks.length === 0) {
        tasksList = <span>Yourtask list is empty</span>
    } else {
        tasksList = props.tasks.map((task: TasksType) => {
            return (
              <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            );
        })
    }
    
    


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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
        
    );
}


export default TodoLIst;