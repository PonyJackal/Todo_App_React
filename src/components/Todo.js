/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { updateTodo, deleteTodo } from '../store/slices/TodoSlice'

const Todo = ({ id, note, completed, onToggle }) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [newNote, setNewNote] = useState(note)

  const updateTodoTrigger = useCallback(
    (todo) => dispatch(updateTodo(todo)),
    [dispatch],
  )
  const deleteTodoTrigger = useCallback(
    (todoId) => dispatch(deleteTodo(todoId)),
    [dispatch],
  )

  const onEdit = () => {
    setIsEdit(true)
  }
  const onNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const onSave = () => {
    setIsEdit(false)
    updateTodoTrigger({ id, note: newNote, completed })
  }
  const onDelete = () => {
    deleteTodoTrigger(id)
  }
  return (
    <li key={id} className="todo-container">
      <label className={completed ? 'completed-todo' : ''}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {!isEdit ? (
          note
        ) : (
          <input type="text" value={newNote} onChange={onNoteChange} />
        )}
      </label>
      {!isEdit ? (
        <div className="todo-actions">
          <FontAwesomeIcon icon={faEye} />
          <FontAwesomeIcon icon={faPencilAlt} onClick={onEdit} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={onDelete} />
        </div>
      ) : (
        // eslint-disable-next-line react/button-has-type
        <button onClick={onSave}>Save</button>
      )}
    </li>
  )
}

Todo.propTypes = {
  id: PropTypes.number,
  note: PropTypes.string,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
}

export default Todo
