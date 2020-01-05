import * as React from "react";

function getDate({ dueDate, dueTime }) {
  if (!dueDate && !dueTime) return null;

  const now = new Date();
  dueDate =
    dueDate || `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  dueTime = dueTime || "00:00";

  return Date.parse(`${dueDate} ${dueTime}`);
}
export default function TodoCreationItem({ onCreate }) {
  const [body, setBody] = React.useState("");
  const [dueDate, setDueDate] = React.useState(null);
  const [dueTime, setDueTime] = React.useState(null);

  return (
    <form
      action="/todos"
      method="post"
      onSubmit={e => {
        e.preventDefault();
        onCreate({ body, dueDate: getDate({ dueDate, dueTime }) });
        setBody("");
        setDueDate(null);
        setDueTime(null);
      }}
    >
      <label htmlFor="newTodoBody">Todo: </label>
      <input
        type="text"
        name="body"
        id="newTodoBody"
        placeholder="What do you need to do?"
        value={body}
        onChange={e => {
          setBody(e.target.value);
        }}
      />
      <label htmlFor="newTodoDueDate">Due date: </label>
      <input
        type="date"
        name="dueDate"
        id="newTodoDueDate"
        value={dueDate}
        onChange={e => {
          setDueDate(e.target.value);
        }}
      />
      <label htmlFor="newTodoDueTime">Due time: </label>
      <input
        type="time"
        name="dueTime"
        id="newTodoDueTime"
        value={dueTime}
        onChange={e => {
          setDueTime(e.target.value);
        }}
      />
      <button>Create</button>
    </form>
  );
}
