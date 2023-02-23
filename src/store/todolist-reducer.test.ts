import { v1 } from "uuid";
import { FilterValuesTupe, TodoLIstType } from "../App";
import { AddTodoListAC, AddTodoListAt, ChangeTodoListFilterAC, ChangeTodoListFilterAT, ChangeTodoListTitleAC, ChangeTodoListTitleAT, RemoveTodoListAC, todolistReducer } from "./todolist-reducer";

/* 1 */
test('correct todolist should be removed', () => {
    //тестовые данные
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodoLIstType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //выполнение тестируемого кода
    // const action: RemoveTodoListActionType = RemoveTodoListAC(todolistId1)
    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))
    //сверка результата с ожидаемым
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


/* 2 */
test('correct todolist should be add', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoLIstType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //
    const action: AddTodoListAt = AddTodoListAC(newTodolistTitle)
    const endState = todolistReducer(startState, action)
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


/* 3 */
test('correct todolist should change its name', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoLIstType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //
    const action: ChangeTodoListTitleAT = ChangeTodoListTitleAC(newTodolistTitle, todolistId2)


    const endState = todolistReducer(startState, action)
    //
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


/* 4 */

test('correct todolist should change its filter', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesTupe = "completed";

    const startState: Array<TodoLIstType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //

    const action: ChangeTodoListFilterAT = ChangeTodoListFilterAC(newFilter, todolistId1)

    

    const endState = todolistReducer(startState, action)
    //

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('all');
});