import React, { useCallback, useContext, useMemo } from "react";

import { TodoStateService } from "services";
import { Todo } from "entities";
import {
    changeToNextState,
    addNewTodo,
    changeToPreviousState,
    getTodosByState,
    isChangeToNextStatePossible,
    isChangeToPreviousStatePossible,
} from "features/Todo";

const TodoStateContext = React.createContext<any>({});

export const useTodoState = () => useContext(TodoStateContext);

interface TodoStateStoreProviderProps {
    useTodoStateService: () => TodoStateService;
}

// This is the hook to access the service in our components.
export const TodoStateProvider: React.FC<TodoStateStoreProviderProps> = ({ children, useTodoStateService }) => {
    // Instantiate service
    const todoStateService = useTodoStateService();

    const todosByState = useMemo(() => {
        return getTodosByState(todoStateService);
    }, [todoStateService]);

    const addTodo = useCallback(
        (todoDescription: string) => {
            addNewTodo(todoDescription, todoStateService);
        },
        [todoStateService]
    );
    const moveToPreviousState = useCallback(
        (todo: Todo) => {
            changeToPreviousState(todo, todoStateService);
        },
        [todoStateService]
    );

    const moveToNextState = useCallback(
        (todo: Todo) => {
            changeToNextState(todo, todoStateService);
        },
        [todoStateService]
    );

    const values = useMemo(
        () => ({
            todosByState,
            addTodo,
            moveToPreviousState,
            moveToNextState,
            isChangeToNextStatePossible,
            isChangeToPreviousStatePossible,
        }),
        [todosByState, addTodo, moveToPreviousState, moveToNextState]
    );

    return <TodoStateContext.Provider value={values}>{children}</TodoStateContext.Provider>;
};
