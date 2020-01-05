import * as React from "react";
import { Link } from "react-router-dom";

export default function TodoListItem({ todo }) {
  return (
    <Link to={`/todos/${todo.id}`}>
      <h1>{todo.body}</h1>
      <div>{todo.dueDate}</div>
    </Link>
  );
}
