import { getUniqueId } from "shared/lib/uuid";

export enum TodoStates {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export type Todo = {
    id: string;
    createdAt: Date;
    description: string;
    state: TodoStates;
};

export type Todos = Record<string, Todo>;

export const createTodo = (description: string) => {
    return {
        id: getUniqueId(),
        state: TodoStates.TODO,
        createdAt: new Date(),
        description,
    };
};

export const updateTodos = (todos: Todos, todoToUpdate: Partial<Todo> & { id: UniqueId }): Todos => {
    const todoId = todoToUpdate.id;
    const updatedTodo = {
        ...todos[todoId],
        ...todoToUpdate,
    };

    return {
        ...todos,
        [todoId]: updatedTodo,
    };
};

export const addTodo = (todos: Todos, newTodo: Todo): Todos => {
    return {
        ...todos,
        [newTodo.id]: newTodo,
    };
};
