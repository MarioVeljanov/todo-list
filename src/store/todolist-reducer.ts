import { v1 } from "uuid";
import { FilterValuesTupe, TodoLIstType } from "../App";


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todoListId: string
    }
}

export type AddTodoListAt = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        todoListId: string
    }
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesTupe
        todoListId: string
    }
}


type ActionType = RemoveTodoListAT | AddTodoListAt | ChangeTodoListTitleAT | ChangeTodoListFilterAT



export const todolistReducer = (todolists: TodoLIstType[], action: ActionType): TodoLIstType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todoListId)
        case 'ADD-TODOLIST':
            const newTodo: TodoLIstType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [...todolists, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map((tl) =>
                tl.id === action.payload.todoListId 
                    ? { ...tl, title: action.payload.title } 
                        : tl
            )
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map((tl) =>
                tl.id === action.payload.todoListId 
                    ? { ...tl, filter: action.payload.filter } 
                        : tl
            )
        default:
            return todolists
        }
 
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId: id
        }
    }
}

export const AddTodoListAC = (title: string): AddTodoListAt => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            todolistId: v1()
        }
    }       
}


export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return  {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title: title,
            todoListId: todoListId
        }
    }       
}


export const ChangeTodoListFilterAC = (filter: FilterValuesTupe, todoListId: string): ChangeTodoListFilterAT => {
    return  {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        filter: filter,
        todoListId: todoListId
    }
}      
}
