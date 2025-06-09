import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TodoList from '../src/pages/TodoList';

describe('TodoList', () => {
    it('renders a list of todos', () => {
        const todos = [
            { id: 1, text: 'Todo 1', completed: false },
            { id: 2, text: 'Todo 2', completed: false },
        ];
        render(<TodoList todos={todos} />);

        expect(screen.getAllByText(/Todo/)).toHaveLength(2);
    });

    it('calls onToggle when a todo is clicked', () => {
        const onToggle = vi.fn();
        const todos = [
            { id: 1, text: 'Todo 1', completed: false },
        ];
        render(<TodoList onToggle={onToggle} todos={todos} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(onToggle).toHaveBeenCalledWith(1);
    });

    it('calls onDelete when a delete button is clicked', () => {
        const onDelete = vi.fn();
        const todos = [
            { id: 1, text: 'Todo 1', completed: false },
        ];
        render(<TodoList onDelete={onDelete} todos={todos} />);

        const button = screen.getByRole('button', { name: 'Delete' });
        fireEvent.click(button);

        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it('calls onAdd when a new todo is submitted', () => {
        const onAdd = vi.fn();
        const todos = [
            { id: 1, text: 'Todo 1', completed: false },
        ];
        render(<TodoList onAdd={onAdd} todos={todos} />);

        const input = screen.getByPlaceholderText('Add new todo');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        const form = input.closest('form');
        fireEvent.submit(form);

        expect(onAdd).toHaveBeenCalledWith('New Todo');
    });
});
