/* eslint-disable react/button-has-type */
import React, { useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, FormControl, Form } from 'react-bootstrap'
import TodoList from './TodoList'
import useDebounce from '../libs/useDebounce'
import useToggle from '../libs/useToggle'
import { addTodo, toggleTodo } from '../store/slices/TodoSlice'

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [findCompleted, toggle] = useToggle(false)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.TodoReducer.todos)
  const addTodoTrigger = useCallback(
    (note) => dispatch(addTodo(note)),
    [dispatch],
  )
  const toggleTodoTrigger = useCallback(
    (id) => dispatch(toggleTodo(id)),
    [dispatch],
  )

  const index = useRef(10)
  const newTodo = useRef('')

  const onAdd = () => {
    if (newTodo.current.value) {
      addTodoTrigger(newTodo.current.value)
      // eslint-disable-next-line no-plusplus
      index.current++
    }

    newTodo.current.value = ''
    newTodo.current.focus()
  }

  const onSave = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const onToggle = useCallback(
    (id) => {
      toggleTodoTrigger(id)
    },
    [toggleTodoTrigger],
  )

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>
        <Form>
          <Form.Group className="mb-3 todo-input-group">
            <Form.Label id="add-note">Note: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a new todo note here"
              ref={newTodo}
            />{' '}
            <Button variant="primary" onClick={onAdd}>
              Add
            </Button>
          </Form.Group>
          <Form.Group className="mb-3 todo-input-group">
            <Form.Label>Find: </Form.Label>
            <FormControl
              placeholder="Find todo note here"
              value={searchTerm}
              onChange={handleChange}
            />

            <Form.Label>Completed: </Form.Label>
            <FormControl
              type="checkbox"
              name="completed"
              onChange={() => toggle()}
              checked={findCompleted}
            />
            {isLoading && <span className="loading">searching ....</span>}
          </Form.Group>
        </Form>
        <TodoList
          data={todos}
          completed={findCompleted}
          searchTerm={debouncedSearch}
          onToggle={onToggle}
        />
        <Button variant="primary" className="save-btn" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default MainLayout
