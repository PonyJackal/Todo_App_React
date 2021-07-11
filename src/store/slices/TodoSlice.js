/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const todos = JSON.parse(localStorage.getItem('todos'))

const initState = {
  todos: [
    ...todos,
    // {
    //   id: 1,
    //   note: 'Making the checkbox',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 2,
    //   note: 'class component is poorly',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 3,
    //   note: 'so easy to create such a poorly',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 4,
    //   note: 'this component is really doing',
    //   completed: true,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 5,
    //   note: 'Functional components can reduce coupling',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 6,
    //   note: 'our code without impacting another',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 7,
    //   note: 'Once again, the constraints put in place by functional',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 8,
    //   note: 'management library such as Redux',
    //   completed: true,
    //   dueDate: '07/11/2021',
    // },
    // {
    //   id: 9,
    //   note: 'The general heuristic I use',
    //   completed: false,
    //   dueDate: '07/11/2021',
    // },
  ],
}

let index = 10

const todosSlice = createSlice({
  name: 'todos',
  initialState: initState,
  reducers: {
    addTodo: (state, action) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          // eslint-disable-next-line no-plusplus
          id: index++,
          note: action.payload.note,
          completed: false,
          dueDate: action.payload.dueDate,
        },
      ],
    }),
    updateTodo: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id !== action.payload.id
          ? todo
          : {
              ...todo,
              note: action.payload.note,
              dueDate: action.payload.dueDate,
            },
      ),
    }),
    deleteTodo: (state, action) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    }),
    toggleTodo: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      }),
    }),
  },
})

export const { addTodo, toggleTodo, updateTodo, deleteTodo } =
  todosSlice.actions

export default todosSlice.reducer
