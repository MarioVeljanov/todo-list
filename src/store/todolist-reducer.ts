import { v1 } from "uuid";


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

type FilterValuesTupe = 'all' | 'active' | 'completed'

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesTupe
        todoListId: string
    }
}

 export type TodoLIstType = {
  id: string
  title: string
  filter: FilterValuesTupe
  // tasks: TasksType[]
}


export type ActionType = RemoveTodoListAT | AddTodoListAt | ChangeTodoListTitleAT | ChangeTodoListFilterAT


const intialState: TodoLIstType[] = []


export const todolistReducer = (state: TodoLIstType[] = intialState, action: ActionType): TodoLIstType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todoListId)
        case 'ADD-TODOLIST':
            const newTodo: TodoLIstType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) =>
                tl.id === action.payload.todoListId 
                    ? { ...tl, title: action.payload.title } 
                        : tl
            )
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) =>
                tl.id === action.payload.todoListId 
                    ? { ...tl, filter: action.payload.filter } 
                        : tl
            )
        default:
            return [...state]
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
