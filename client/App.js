import * as React from "react";
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import subscribeToNotifications from "./subscribeToNotifications";
import NotificationIcon from "./icons/feed.svg";
import TodosList from "./TodosList";
import TodoDetail from "./TodoDetail";

export default function App() {
  const history = useHistory();
  const todoMatch = useRouteMatch("/todos/:id");
  const [todos, setTodos] = React.useState();

  const isTodoRoute = Boolean(todoMatch);

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
          <button className="feedIcon" onClick={subscribeToNotifications}>
            <NotificationIcon />
          </button>
        </header>
        <aside
          className={isTodoRoute ? "app-todosList inactive" : "app-todosList"}
        >
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

        <main
          className={isTodoRoute ? "app-todoDetail active" : "app-todoDetail"}
        >
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
