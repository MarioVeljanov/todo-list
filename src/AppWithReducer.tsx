import { AppBar, Button, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { Reducer, useReducer, useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { addTaskAC, changeStatusAC, changeTaskTitlesAC, RemoveTaskAC, tasksReducer } from './store/tasks-reducer';
import { ActionType, AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todolistReducer } from './store/todolist-reducer';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';

export type FilterValuesTupe = 'all' | 'active' | 'completed'


 export type TodoLIstType = {
  id: string
  title: string
  filter: FilterValuesTupe
  // tasks: TasksType[]
}

export type TasksStateType = {
  [TodoLIstId: string]: TasksType[]
}

function AppWithReducer() {
  const todoList_1: string = v1()
  const todoList_2: string = v1()

  const [todoLists, dispatchTodolist] = useReducer<Reducer<TodoLIstType[], ActionType>>(todolistReducer, [
    { id: todoList_1, title: "What to learn", filter: "all" },
    { id: todoList_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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



    const addTodolist = (title: string) => {
      let action = AddTodoListAC(title)
      dispatchTodolist(action);
      dispatchTasks(action);
    }

    const removeTask = (taskId: string, todoListId: string) => {
      dispatchTasks(RemoveTaskAC(taskId, todoListId));
    }

    const changeFilter = (filter: FilterValuesTupe, todoListId: string) => {
      dispatchTodolist(ChangeTodoListFilterAC(filter, todoListId));
    };

    const changeFilterTitle = (title: string, todoListId: string) => {
      dispatchTodolist(ChangeTodoListTitleAC(title, todoListId));
    };


    const removeTodoList = (todoListId: string) => {
      let action = RemoveTodoListAC(todoListId);
      dispatchTodolist(action);
      dispatchTasks(action);
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
      dispatchTasks(addTaskAC(title, todoListId));
    };

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
      dispatchTasks(changeStatusAC(taskId, isDone, todoListId));
    }

    const changeTaskTitle = (taskId: string, title:string, todoListId: string) => {
      dispatchTasks(changeTaskTitlesAC(taskId, title, todoListId));
    }

    const todoListItems = todoLists.map(tl => {
      const filterTasksForRender = getFiltredTasksForRender(tasks[tl.id], tl.filter);
      return (
        <Grid item >
          <Paper style={{ padding: "20px" }}>
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
          </Paper>
        </Grid>
      );
    })

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu open={false} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TodoLists
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container>
            <div>
              <AddItemForm addItem={addTodolist} />
            </div>
          </Grid>

          <Grid container spacing={10} style={{ margin: "20px" }}>
            {todoListItems}
          </Grid>
        </Container>
      </div>
    );
}


export default AppWithReducer;




/* 
  <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

*/
