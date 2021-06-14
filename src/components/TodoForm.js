import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  // here we using useRef, so whatever comes in useRef then by using useEffect we will focus on current which is given in useEffect
  // then put inputRef in ref attribute in form tag for reference
  // so here we are using useRef and useEffect to focus on input field
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  // this function is used in form tag attribute onChange
  // it will handle when there is change in input field and stay targeted on input field
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // here we are preventing submit button default to not refresh page after submission
  // and placed it on form attribute
  const handleSubmit = (e) => {
    e.preventDefault();

    // using props here and also pass props parameter in TodoForm() function so we can share date with other components
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      // id: Date.now(),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* here we are using useState parameters values which is get by using props from todo.js to check if edit button is clicked then it will
      show input field with UPDATE button otherwise it will show input field with Add Todo button  */}
      {props.edit ? (
        <>
          <input
            className="todo-input"
            type="text"
            placeholder="Update your todo"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Update</button>
        </>
      ) : (
        <>
          <input
            className="todo-input"
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add Todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
