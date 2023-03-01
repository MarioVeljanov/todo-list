import {TasksStateType} from '../App';
import {v1} from 'uuid';
import { act } from '@testing-library/react';
import { AddTodoListAt, RemoveTodoListAT } from './todolist-reducer';

export type FirstActionType = ReturnType<typeof RemoveTaskAC>
export type SecondActionType = ReturnType<typeof addTaskAC>
export type ThirdActionType = ReturnType<typeof changeStatusAC>
export type FourthActionType = ReturnType<typeof changeTaskTitlesAC>

type ActionsType = 
    FirstActionType 
    | SecondActionType 
    | ThirdActionType 
    | FourthActionType 
    | AddTodoListAt
    | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
         case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
         case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
         case 'REMOVE-TODOLIST':
            // const copyTasks = {...state}
            // delete copyTasks[action.payload.todoListId]
            // return copyTasks
            let {[action.payload.todoListId]: [], ...rest} = {...state}
            return rest
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitlesAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}
