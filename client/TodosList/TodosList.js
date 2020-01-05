import * as React from "react";

import TodoCreationItem from "./TodoCreationItem";
import TodoListItem from "./TodoListItem";
import LoadingItem from "./LoadingItem";

export default function TodosList({ todos, onCreate }) {
  return (
    <ul className="todoList-list">
      <li>
        <TodoCreationItem onCreate={onCreate} />
      </li>
      {todos ? (
        todos.map(todo => (
          <li key={todo.id} className="todoList-listItem">
            <TodoListItem todo={todo} />
          </li>
        ))
      ) : (
        <li>
          <LoadingItem />
        </li>
      )}
    </ul>
  );
}
