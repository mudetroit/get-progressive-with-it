import * as React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import TodosList from "./TodosList";
import TodoDetail from "./TodoDetail";

export default function App() {
  const history = useHistory();
  const [todos, setTodos] = React.useState();

  React.useEffect(function() {
    let didCancel = false;

    function fetchTodos() {
      fetch("/todos")
        .then(response => {
          return response.json();
        })
        .then(todos => {
          if (!didCancel) setTodos(todos);
        });
    }

    fetchTodos();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <Route exact path="/todos">
        <Redirect to="/" />
      </Route>
      <section className="app">
        <header className="app-header">
          <h1>Get Progressive with it</h1>
        </header>
        <aside className="app-todosList">
          <TodosList
            todos={todos}
            onCreate={data => {
              fetch("/todos", {
                method: "POST",
                cache: "no-cache",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, complete: false })
              })
                .then(response => {
                  if (!response.ok) throw new Error("Invalid response");
                  return response.json();
                })
                .then(todo => {
                  setTodos(todos.concat([todo]));
                  history.push(`/todos/${todo.id}`);
                });
            }}
          />
        </aside>
        <main className="app-todoDetail">
          <Route path={"/todos/:id"}>
            <TodoDetail
              todos={todos}
              onDelete={todo => {
                fetch(`/todos/${todo.id}`, { method: "DELETE" }).then(
                  response => {
                    if (!response.ok) throw new Error("Invalid response");

                    history.push(`/`);
                    setTodos(todos.filter(t => t.id !== todo.id));
                  }
                );
              }}
              onToggleComplete={todo => {
                fetch(`/todos/${todo.id}`, {
                  method: "PUT",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ ...todo, complete: !todo.complete })
                })
                  .then(response => {
                    if (!response.ok) throw new Error("Invalid response");
                    return response.json();
                  })
                  .then(todo => {
                    setTodos(todos.map(t => (t.id === todo.id ? todo : t)));
                  });
              }}
            />
          </Route>
        </main>
        <footer className="app-footer">
          <span>Get Progressive with it</span>
          <span>© Matt LaForest, 2020</span>
        </footer>
      </section>
    </>
  );
}
