import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ data, searchTerm, completed, onToggle }) => (
  <ul className="todos-list">
    {data
      .filter(
        (todo) =>
          (!searchTerm ||
            todo.note.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!completed || todo.completed === completed),
      )
      .map((todo) => (
        <Todo {...todo} onToggle={onToggle} key={todo.id} />
      ))}
  </ul>
)

TodoList.propTypes = {
  data: PropTypes.array,
  searchTerm: PropTypes.string,
  onToggle: PropTypes.func,
  completed: PropTypes.bool,
}

export default React.memo(TodoList)
