import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';

export type FilterValuesTupe = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = 'What to learn'
    const todoLisTitle_2: string = 'What to buy'
    const [tasks, setTasks] = useState<Array<TasksType>>([
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "C#", isDone: false },
      { id: v1(), title: "C++", isDone: false },
    ]);
    const tasks_2: Array<TasksType> = [
        { id: v1(), title: "TS", isDone: true },
        { id: v1(), title: "C++", isDone: false },
        { id: v1(), title: "Python", isDone: true },
    ];

    const removeTask = (taskId: string) => {
      setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesTupe>('all')
    const changeFilter = (filter: FilterValuesTupe) => {setFilter(filter)}
    
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

    const addTask = (title: string) => {
      const newTask: TasksType = {
        id: v1(),
        title: title,
        isDone: false
      }
      setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    return (
      <div className="App">
        <TodoLIst
          title={todoListTitle_1}
          tasks={filterTasksForRender}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          filter={filter}
        />
        {/* <TodoLIst title={todoLisTitle_2} tasks={tasks_2} /> */}
      </div>
    );
}


export default App;
