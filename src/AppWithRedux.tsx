import { AppBar, Button, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { Reducer, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { AppRootType } from './store/store';
import { addTaskAC, changeStatusAC, changeTaskTitlesAC, RemoveTaskAC, tasksReducer } from './store/tasks-reducer';
import { ActionType, AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todolistReducer } from './store/todolist-reducer';
import TodoLIst from './TodoLIst';
import { TasksType } from './TodoLIst';
import TodoListWithRedux from './TodolistWithRedux';

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

function AppWithRedux() {

    let todolists = useSelector<AppRootType, TodoLIstType[]>(state => state.todolists)
    // let tasks = useSelector<AppRootType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const addTodolist = (title: string) => {
      let action = AddTodoListAC(title)
      dispatch(action);
    }


    const todoListItems = todolists.map((tl) => {

      return (
        <Grid item key={tl.id}>
          <Paper style={{ padding: "20px" }}>
            <TodoListWithRedux
              todoListId={tl.id}
              title={tl.title}
              filter={tl.filter}
              
            />
          </Paper>
        </Grid>
      );
    });

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


export default AppWithRedux;




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
