import { v1 } from "uuid"
import { TasksStateType, TodoLIstType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { AddTodoListAC, RemoveTodoListAC, todolistReducer } from "./todolist-reducer"

test('its should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodoLIstType[] = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

test('its should be equals', () => {
  const todoList_1: string = v1()
  const todoList_2: string = v1()

  const startTasksState: TodoLIstType[] = [
    { id: todoList_1, title: "What to learn", filter: "all" },
    { id: todoList_2, title: "What to buy", filter: "all" },
  ];

  const startTodolistsState: TasksStateType = {
    [todoList_1]: [ 
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
    ],
    [todoList_2]: [
      { id: v1(), title: "C#", isDone: false },
      { id: v1(), title: "C++", isDone: false },
    ],
  };

    const action = RemoveTodoListAC(todoList_1)

    const endTodolistsState = todolistReducer(startTasksState, action)
    const endTasksState = tasksReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    // expect(idFromTasks).toBe(action.payload.todolistId)
    // expect(idFromTodolists).toBe(action.payload.todolistId)
    expect(keys.length).toBe(1)
    expect(endTodolistsState.length).toBe(1)
})

