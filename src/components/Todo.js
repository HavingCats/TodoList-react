import React from "react";
import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
      console.log(ref.current+'was之前001');
    });
    return ref.current;
  }

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);
  console.log(wasEditing+'was002');

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit"
          /*onClick={handleSubmit},不需要这个，因为button type="submit"会自动调用handleSubmit*/
        >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  /*- 
我们还向 `useEffect()` 传递一个数组作为第二个参数。这个数组是 `useEffect()` 应该依赖的值列表。
包含这些值后， `useEffect()` 只会在这些值之一发生变化时运行。
我们只想在 `isEditing` 的值发生变化时改变焦点。*/
  /* 注意：useEffect 在每次渲染后都会执行，所以每次渲染后都会调用 focus()。 */


  return (
    <li className="todo">{isEditing ? editingTemplate : viewTemplate} </li>
  );
}

export default Todo;
