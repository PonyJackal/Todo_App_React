/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, FormControl, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import TodoList from './TodoList'
import CalendarView from './CalendarView'
import useDebounce from '../libs/useDebounce'
import useToggle from '../libs/useToggle'
import { addTodo, toggleTodo } from '../store/slices/TodoSlice'

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [findCompleted, toggle] = useToggle(false)
  const [calendarView, toggleCalendarView] = useToggle(false)
  const [date, setDate] = useState(new Date().toDateString())
  const debouncedSearch = useDebounce(searchTerm, 500)

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.TodoReducer.todos)
  const addTodoTrigger = useCallback(
    (todo) => dispatch(addTodo(todo)),
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
      addTodoTrigger({ title: newTodo.current.value, date })
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
            <Form.Label id="add-title">Title: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a new todo title here"
              ref={newTodo}
            />
            <DatePicker
              className="date-picker"
              selected={new Date(date)}
              onChange={(d) => setDate(d.toDateString())}
            />
            <Button variant="primary" onClick={onAdd}>
              Add
            </Button>
          </Form.Group>
          <Form.Group className="mb-3 todo-input-group">
            <Form.Label>Find: </Form.Label>
            <FormControl
              placeholder="Find todo title here"
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
            <Form.Label>Calendar: </Form.Label>
            <FormControl
              type="checkbox"
              name="completed"
              onChange={() => toggleCalendarView()}
              checked={calendarView}
            />
            {isLoading && <span className="loading">searching ....</span>}
          </Form.Group>
        </Form>
        {!calendarView ? (
          <TodoList
            data={todos}
            completed={findCompleted}
            searchTerm={debouncedSearch}
            onToggle={onToggle}
          />
        ) : (
          <CalendarView
            data={todos}
            completed={findCompleted}
            searchTerm={debouncedSearch}
          />
        )}

        <Button variant="primary" className="save-btn" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default MainLayout
