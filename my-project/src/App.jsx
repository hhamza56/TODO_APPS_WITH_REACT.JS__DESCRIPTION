import React, { useState } from 'react';
import './App.css'; 

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          description: newDescription,
          completed: false,
        },
      ]);
      setNewTodo('');
      setNewDescription('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const enterEditMode = (id, text, description) => {
    setEditMode(id);
    setEditedTodo(text);
    setEditedDescription(description);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editedTodo, description: editedDescription }
          : todo
      )
    );
    setEditMode(null);
  };

  return (
    <div className="todo-app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter description"
        ></textarea>
        <button onClick={addTodo}>Add Todo</button>
        <button className="delete-all-btn" onClick={deleteAllTodos}>
          Delete All
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="todo-header">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {editMode === todo.id ? (
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : (
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
              )}
            </div>
            {editMode === todo.id ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Edit description"
              ></textarea>
            ) : (
              <div className="todo-description">
                {todo.description}
              </div>
            )}
            {editMode === todo.id ? (
              <button className="update-btn" onClick={() => updateTodo(todo.id)}>
                Update
              </button>
            ) : (
              <>
                <button className="edit-btn" onClick={() => enterEditMode(todo.id, todo.text, todo.description)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
