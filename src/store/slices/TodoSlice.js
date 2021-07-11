/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const todos = JSON.parse(localStorage.getItem('todos'))

const initState = {
  todos: [...todos],
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
