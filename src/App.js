import React, { useState, useCallback, useEffect } from 'react';

// Functional Component
function App() {
  // Hooks 
  const [newTodo, setNewTodo] = useState(''); // Returns an array with 2 values
  const [todos, setTodos] = useState([]);


  const onTodoChange = useCallback((event) => {
    console.log(event.target.value);
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return; // Cannot add empty strings
    setTodos([
      ...todos, //spread the todos array
      // New values of the Array
      {
        id: todos.length + 1,
        content: newTodo,
        done: false,
      }
    ]);
    setNewTodo("");

  }, [newTodo, todos]); // Pass in the variables for the callback changes

  // This function will only run if todos changes
  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodo = [...todos];
    newTodo.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodo);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    // create a copy of the array
      // create a copy of each of the items
        // update the done property to be true on each of the new items
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a todo:</label>
        <input 
        id="newTodo"
        name="newTodo"
        value={newTodo} 
        onChange={onTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todos, index) => (
          <li key={todos.id} >
            <input 
            type="checkbox" 
            checked={todos.done}
            onChange={addTodo(todos, index)}
            />
            <span className={todos.done ? 'done' : ''}>{todos.content}</span>
            <button onClick={removeTodo(todos)}>Remove Todo</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

// Exports component
export default App;
