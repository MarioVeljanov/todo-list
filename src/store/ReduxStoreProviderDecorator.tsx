import React from 'react'
import { Provider } from 'react-redux'
import { AppRootType, store } from './store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from './tasks-reducer'
import { todolistReducer } from './todolist-reducer'
import { v1 } from 'uuid'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        ['tod-olistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}, 
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialState as AppRootType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>;
}