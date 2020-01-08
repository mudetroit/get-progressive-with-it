import * as React from "react";
import { useParams } from "react-router-dom";

export default function TodoDetail({ todos, onDelete, onToggleComplete }) {
  const params = useParams();

  // A couple funny things going on here worth noting:
  // - We want type coercion here. The parameter is a string and the id is a number
  // - We fake in an empty array to deal with a race condition when deleting
  //   where the todo is removed from the list before the redirect happens.
  const todo = (todos || []).find(t => t.id == params.id);

  if (!todo) {
    return (
      <div className="todoDetail-container">
        <div>Loading</div>
      </div>
    );
  }

  const url = `/todos/${todo.id}`;

  return (
    <div className="todoDetail-container">
      <header>
        <h1>{todo.body}</h1>
        <div>{todo.complete ? "Complete" : "Incomplete"}</div>
      </header>
      <div className="todoDetail-actions">
        <form
          action={url}
          method="delete"
          onSubmit={e => {
            e.preventDefault();
            onDelete(todo);
          }}
        >
          <button value="delete">Delete</button>
        </form>
        <form
          action={url}
          method="post"
          onSubmit={e => {
            e.preventDefault();
            onToggleComplete(todo);
          }}
        >
          <button value="complete">Complete</button>
        </form>
      </div>
    </div>
  );
}
