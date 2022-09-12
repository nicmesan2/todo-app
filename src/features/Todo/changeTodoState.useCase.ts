import { Todo } from "entities";
import { TodoStates } from "entities/Todo.entity";
import { TodoStateService } from "services";

// Add business logic regarding workflow.
// For example in the future we could want to prevent users to move todos in
// todo state to in done directly
export const isNewStateIsAllowed = (todo: Todo, newState: TodoStates) => {
    if (todo.state === newState) return false;

    return true;
};

export const changeTodoStatus = (todo: Todo, newState: TodoStates, todosStateService: TodoStateService) => {
    if (isNewStateIsAllowed(todo, newState)) {
        const updatedTodo = {
            ...todo,
            state: newState,
        };

        todosStateService.updateOne(updatedTodo);
    }
};

export const isChangeToNextStatePossible = (todoState: TodoStates) => todoState !== TodoStates.DONE;
export const isChangeToPreviousStatePossible = (todoState: TodoStates) => todoState !== TodoStates.TODO;

export const changeToNextState = (todo: Todo, todosStateService: TodoStateService) => {
    switch (todo.state) {
        case TodoStates.TODO:
            changeTodoStatus(todo, TodoStates.IN_PROGRESS, todosStateService);
            break;
        case TodoStates.IN_PROGRESS:
            changeTodoStatus(todo, TodoStates.DONE, todosStateService);
            break;
    }
};

export const changeToPreviousState = (todo: Todo, todosStateService: TodoStateService) => {
    switch (todo.state) {
        case TodoStates.DONE:
            changeTodoStatus(todo, TodoStates.IN_PROGRESS, todosStateService);
            break;
        case TodoStates.IN_PROGRESS:
            changeTodoStatus(todo, TodoStates.TODO, todosStateService);
            break;
    }
};
