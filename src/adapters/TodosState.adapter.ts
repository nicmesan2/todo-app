import { useCallback, useState } from "react";

import { Todo, Todos, updateTodos, addTodo } from "entities/Todo.entity";
import { TodoStateService } from "services";

// Current implementation of the in-memory app storage. If we want to change it, it would be as easy as
// changing the implementation respecting the interface contract.
export const useTodoStateMemoryAdapter: () => TodoStateService = (initTodos?: Todos) => {
    const [todos, setTodos] = useState<Todos | undefined>(initTodos);

    const selectAll = useCallback(() => {
        return todos;
    }, [todos]);

    const addOne = useCallback(
        (newTodo: Todo) => {
            const updateTodos = addTodo(todos as Todos, newTodo);

            setTodos(updateTodos);
        },
        [todos]
    );

    const updateOne = useCallback(
        (todoToUpdate: Todo) => {
            const updatedTodos = updateTodos(todos as Todos, todoToUpdate);

            setTodos(updatedTodos);
        },
        [todos]
    );

    const setAll = (todos: Todos) => {
        setTodos(todos);
    }

    return {
        selectAll,
        addOne,
        updateOne,
        setAll
    };
};

// This is an example on how easy is to change to a local storage adapter
// export const LOCAL_STORAGE_KEY = "todos";
//
// export const useTodoStateLocalStorageAdapter: () => TodoStateService = (initTodos: Todos = {}) => {
//     const [, setTodos] = useState(initTodos);
//
//     const selectAll = () => {
//         const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
//
//         return todos ? JSON.parse(todos) : [];
//     };
//
//     const addOne = (todo: Todo) => {
//         const todos = selectAll();
//
//         const updateTodos = addTodo(todos, todo);
//
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
//         setTodos(updateTodos);
//     };
//
//     const updateOne = (todoToUpdate: Todo) => {
//         const todos = selectAll();
//
//         const updatedTodos = updateTodos(todos, todoToUpdate);
//
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
//         setTodos(updatedTodos);
//     };
//
//     return {
//         selectAll,
//         addOne,
//         updateOne,
//     };
// };
