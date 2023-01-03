import React from 'react';
import './App.css';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';

function App() {
    const todoListTitle_1: string = 'What to learn'
    const todoLisTitle_2: string = 'What to buy'
    const tasks_1: Array<TasksType> = [
      { id: 1, title: "HTML", isDone: false },
      { id: 2, title: "CSS", isDone: true },
      { id: 3, title: "JS/TS", isDone: false },
      { id: 3, title: "JS/TS", isDone: false },
      { id: 3, title: "JS/TS", isDone: true },
    ];
    return (
        <div className="App">
            
            <TodoLIst title={todoListTitle_1} tasks={tasks_1}/>
            {/* <TodoLIst title={todoLisTitle_2}/> */}
        </div>
    );
}

export default App;
