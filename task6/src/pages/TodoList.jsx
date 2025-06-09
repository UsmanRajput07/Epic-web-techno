import { useState } from "react";
import React from "react";

const TodoList = ({ todos, onToggle, onDelete, onAdd }) => {
    const [newTodo, setNewTodo] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            onAdd(newTodo.trim());
            setNewTodo('');
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;