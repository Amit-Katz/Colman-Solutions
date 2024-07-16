import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'api/tasks';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        text: inputValue,
        completed: false,
      };
      try {
        await axios.post(API_URL, newTodo);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };

      try {
        await axios.put(`${API_URL}/${id}`, updatedTodo);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          )
        );
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
