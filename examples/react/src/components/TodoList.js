import classnames from "classnames";
import { map } from "microstates";
import PropTypes from "prop-types";
import React from "react";
import TodoMVC from "../models";
import TodoItem from "./TodoItem";
import TodoTextInput from "./TodoTextInput";

export default function TodoList({ model }) {
  return (
    <ul className="todo-list">
      {map(
        todo => (
          <li
            className={classnames({
              completed: todo.state.completed,
              editing: todo.state.editing
            })}
            key={todo.state.id}
          >
            {todo.state.editing ? (
              <TodoTextInput
                text={todo.state.text}
                classes="edit"
                onSave={todo.save}
                onChange={todo.text.set}
                onBlur={todo.save}
              />
            ) : (
              <TodoItem
                todo={todo}
                onDelete={() => model.todos.filter(state => todo.state !== state)}
              />
            )}
          </li>
        ),
        model.todos
      )}
    </ul>
  );
}

TodoList.propTypes = {
  model: PropTypes.shape({
    state: PropTypes.instanceOf(TodoMVC)
  })
};
