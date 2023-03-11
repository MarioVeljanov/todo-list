import { tasksReducer, RemoveTaskAC, addTaskAC, changeStatusAC, changeTaskTitlesAC } from './tasks-reducer';
import {TasksStateType} from '../App';
import { AddTodoListAC } from './todolist-reducer';

let startState: TasksStateType

beforeEach(() => {
    startState = {
       "todolistId1": [
           { id: "1", title: "CSS", isDone: false },
           { id: "2", title: "JS", isDone: true },
           { id: "3", title: "React", isDone: false }
       ],
       "todolistId2": [
           { id: "1", title: "bread", isDone: false },
           { id: "2", title: "milk", isDone: true },
           { id: "3", title: "tea", isDone: false }
       ]
    };
})


test('correct task should be deleted from correct array', () => {


   const action = RemoveTaskAC("2", "todolistId2")
  
   const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
   "todolistId1": [
       { id: "1", title: "CSS", isDone: false },
       { id: "2", title: "JS", isDone: true },
       { id: "3", title: "React", isDone: false }
   ],
   "todolistId2": [
       { id: "1", title: "bread", isDone: false },
       { id: "3", title: "tea", isDone: false }
   ]
});

})


test('correct task should be added to correct array', () => {

   const action = addTaskAC("juce", "todolistId2");

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(4);
   expect(endState["todolistId2"][0].id).toBeDefined();
   expect(endState["todolistId2"][0].title).toBe("juce");
   expect(endState["todolistId2"][0].isDone).toBe(false);
})


test('correct task should be added to correct array', () => {

   const action = changeStatusAC('1', true, "todolistId2");

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"][0].isDone).toBe(false);
   expect(endState["todolistId2"][0].isDone).toBe(true);
})

test('correct task should be added to correct array', () => {

   const action = changeTaskTitlesAC('1', "juce", "todolistId2");

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"][0].title).toBe('CSS');
   expect(endState["todolistId2"][0].title).toBe("juce");
})

test('correct task should be added to correct array', () => {

   const action = AddTodoListAC( "new todolst");

   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)
   const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')

   if(!newKey) {
    throw Error("new key should be added")
   }
   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
})


