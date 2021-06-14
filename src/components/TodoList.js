import axios from "axios";
import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

// const firebasePath =
//   "https://react-todoapp-firebase-default-rtdb.firebaseio.com/";

function TodoList() {
  const [todos, setTodos] = useState([]);

  // doing some clear data for input so user can only insert valid data on input and submit
  // add todo
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // cloning todos list into todo
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(todo);

    // add anyname.json at the end of url
    // fetch(
    //   "https://react-todoapp-firebase-default-rtdb.firebaseio.com/todo.json"
    // );

    // fetch(firebasePath + "todos.json", {
    //   method: "POST",
    //   body: {
    //     name: "todo-item",
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });

    axios
      .post(
        "https://react-todoapp-firebase-default-rtdb.firebaseio.com/todos.json",
        {
          name: todo,
        }
      )
      .then((res) => {
        console.log(res);
      });
    console.log("Saved to firebase!!!");

    axios
      .get(
        "https://react-todoapp-firebase-default-rtdb.firebaseio.com/todos.json"
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  // update todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
    console.log(newValue);
  };

  // remove todo
  const removeTodo = (id) => {
    const removeArray = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArray);
  };

  // complete todo
  // this function is checking that selected todo task id is equal or not if it is equal then make it completed
  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
