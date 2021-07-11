import { createSlice } from '@reduxjs/toolkit'

const todos = JSON.parse(localStorage.getItem('todos'))

const initState = {
  todos: [
    ...todos,
    // {
    //   id: 1,
    //   note: 'Making the checkbox',
    //   completed: false,
    // },
    // {
    //   id: 2,
    //   note: 'class component is poorly',
    //   completed: false,
    // },
    // {
    //   id: 3,
    //   note: 'so easy to create such a poorly',
    //   completed: false,
    // },
    // {
    //   id: 4,
    //   note: 'this component is really doing',
    //   completed: true,
    // },
    // {
    //   id: 5,
    //   note: 'Functional components can reduce coupling',
    //   completed: false,
    // },
    // {
    //   id: 6,
    //   note: 'our code without impacting another',
    //   completed: false,
    // },
    // {
    //   id: 7,
    //   note: 'Once again, the constraints put in place by functional',
    //   completed: false,
    // },
    // {
    //   id: 8,
    //   note: 'management library such as Redux',
    //   completed: true,
    // },
    // {
    //   id: 9,
    //   note: 'The general heuristic I use',
    //   completed: false,
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
          note: action.payload,
          completed: false,
        },
      ],
    }),
    updateTodo: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id !== action.payload.id
          ? todo
          : {
              id: action.payload.id,
              note: action.payload.note,
              completed: action.payload.completed,
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
