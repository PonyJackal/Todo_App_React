/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const todos = JSON.parse(localStorage.getItem('todos'))

const initState = {
  todos: [
    // ...todos,
    {
      id: 1,
      title: 'Making the checkbox',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 2,
      title: 'class component is poorly',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 3,
      title: 'so easy to create such a poorly',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 4,
      title: 'this component is really doing',
      completed: true,
      date: '07/11/2021',
    },
    {
      id: 5,
      title: 'Functional components can reduce coupling',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 6,
      title: 'our code without impacting another',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 7,
      title: 'Once again, the constraints put in place by functional',
      completed: false,
      date: '07/11/2021',
    },
    {
      id: 8,
      title: 'management library such as Redux',
      completed: true,
      date: '07/11/2021',
    },
    {
      id: 9,
      title: 'The general heuristic I use',
      completed: false,
      date: '07/11/2021',
    },
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
          title: action.payload.title,
          completed: false,
          date: action.payload.date,
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
              title: action.payload.title,
              date: action.payload.date,
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
