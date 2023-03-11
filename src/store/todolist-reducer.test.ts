import { v1 } from "uuid";
import { FilterValuesTupe, TodoLIstType } from "../App";
import { AddTodoListAC, AddTodoListAt, ChangeTodoListFilterAC, ChangeTodoListFilterAT, ChangeTodoListTitleAC, ChangeTodoListTitleAT, RemoveTodoListAC, todolistReducer } from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoLIstType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})
/* 1 */
test('correct todolist should be removed', () => {

    //выполнение тестируемого кода
    // const action: RemoveTodoListActionType = RemoveTodoListAC(todolistId1)
    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))
    //сверка результата с ожидаемым
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


/* 2 */
test('correct todolist should be add', () => {


    let newTodolistTitle = "New Todolist";


    const action: AddTodoListAt = AddTodoListAC(newTodolistTitle)
    const endState = todolistReducer(startState, action)
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


/* 3 */
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleAT = ChangeTodoListTitleAC(newTodolistTitle, todolistId2)


    const endState = todolistReducer(startState, action)
    //
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


/* 4 */

test('correct todolist should change its filter', () => {

    let newFilter: FilterValuesTupe = "completed";

    const action: ChangeTodoListFilterAT = ChangeTodoListFilterAC(newFilter, todolistId1)

    

    const endState = todolistReducer(startState, action)
    //

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('all');
});