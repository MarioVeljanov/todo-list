import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';

export type FilterValuesTupe = 'all' | 'active' | 'completed'


type TodoLIstType = {
  id: string
  title: string
  filter: FilterValuesTupe
  // tasks: TasksType[]
}

type TasksStateType = {
  [TodoLIstId: string]: TasksType[]
}

function App() {
  const todoList_1: string = v1()
  const todoList_2: string = v1()

  const [todoLists, setTodoLists] = useState<TodoLIstType[]>([
    { id: todoList_1, title: "What to learn", filter: "all" },
    { id: todoList_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoList_1]: [ 
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
    ],
    [todoList_2]: [
      { id: v1(), title: "C#", isDone: false },
      { id: v1(), title: "C++", isDone: false },
    ],
  });



  /* ............................................................... */


    const addTodolist = (title: string) => {
      const newTodo: TodoLIstType = 
        {id: v1(), title: title, filter: 'all'}
   

      setTodoLists([...todoLists, newTodo]);
      setTasks({...tasks, [newTodo.id]: []})
    }

    const removeTask = (taskId: string, todoListId: string) => {
      // const tasksForUpdate = tasks[todoListId]
      // const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId)
      // const copyTasks = {...tasks}
      // copyTasks[todoListId] = updatedTasks
      // setTasks(copyTasks)
      
      /* ........... */
      
      setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)});
    }

    const changeFilter = (filter: FilterValuesTupe, todoListId: string) => {
      setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    };

    const changeFilterTitle = (title: string, todoListId: string) => {
      setTodoLists(
        todoLists.map((tl) =>
          tl.id === todoListId ? { ...tl, title: title } : tl
        )
      );
    };


    const removeTodoList = (todoListId: string) => {
      setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
      const copyTasks = {...tasks}
      delete copyTasks[todoListId]
      setTasks(copyTasks)
    };
    
    const getFiltredTasksForRender = (tasks: Array<TasksType>, filter: FilterValuesTupe): Array<TasksType> => {
      
      if(filter === 'active') {
        return tasks.filter(tasks => tasks.isDone === false)
      } else if(filter === 'completed') {
        return tasks.filter((tasks) => tasks.isDone === true);
      } else {
        return tasks
      }
    }
    

    const addTask = (title: string, todoListId: string) => {
      const newTask: TasksType = {
        id: v1(),
        title: title,
        isDone: false,
      };
      
      // const tasksForUpdate = tasks[todoListId]
      // const updatedTasks = [newTask, ...tasksForUpdate]
      // const copyTasks = { ...tasks }
      // copyTasks[todoListId] = updatedTasks
      setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    };

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
      setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
      // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const changeTaskTitle = (taskId: string, title:string, todoListId: string) => {
      setTasks({
        ...tasks,
        [todoListId]: tasks[todoListId].map((t) =>
          t.id === taskId ? { ...t, title: title } : t
        ),
      });
    }

    const todoListItems = todoLists.map(tl => {
      const filterTasksForRender = getFiltredTasksForRender(tasks[tl.id], tl.filter);
      return (
        <TodoLIst
          key={tl.id}
          todoListId={tl.id}
          title={tl.title}
          tasks={filterTasksForRender}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          filter={tl.filter}
          removeTodoList={removeTodoList}
          changeTaskTitle={changeTaskTitle}
          changeFilterTitle={changeFilterTitle}
        />
      );
    })

    return (
      <div className="App">
        <AddItemForm addItem={addTodolist} />
        {todoListItems}
      </div>
    );
}


export default App;
