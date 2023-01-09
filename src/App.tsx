import React, { useState } from 'react';
import './App.css';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';

export type FilterValuesTupe = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = 'What to learn'
    const todoLisTitle_2: string = 'What to buy'
    const [tasks, setTasks] = useState<Array<TasksType>>([
      { id: 1, title: "HTML", isDone: false },
      { id: 2, title: "CSS", isDone: true },
      { id: 3, title: "JS/TS", isDone: false },
      { id: 4, title: "JS", isDone: true },
      { id: 5, title: "C#", isDone: false },
      { id: 6, title: "C++", isDone: false },
    ]);
    const tasks_2: Array<TasksType> = [
        { id: 1, title: "TS", isDone: true },
        { id: 2, title: "C++", isDone: false },
        { id: 3, title: "Python", isDone: true },
    ];

    const removeTask = (taskId: number) => {
      setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesTupe>('all')
    const changeFilter = (filter: FilterValuesTupe) => { setFilter(filter)}
    const getFiltredTasksForRender = (tasks: Array<TasksType>, filter: FilterValuesTupe): Array<TasksType> => {
      
      if(filter === 'active') {
        return tasks.filter(tasks => tasks.isDone === false)
      } else if(filter === 'completed') {
        return tasks.filter((tasks) => tasks.isDone === true);
      } else {
        return tasks
      }
    }
const filterTasksForRender = getFiltredTasksForRender(tasks, filter)
    return (
      <div className="App">
        <TodoLIst title={todoListTitle_1} tasks={filterTasksForRender} removeTask={removeTask} changeFilter={changeFilter}/>
        {/* <TodoLIst title={todoLisTitle_2} tasks={tasks_2} /> */}
      </div>
    );
}


export default App;
