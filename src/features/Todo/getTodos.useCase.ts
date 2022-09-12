import { TodoStateService } from "services";
import { Todo, Todos } from "entities";
import { TodoStates } from "entities/Todo.entity";

const orderTodosByState = (todos: Todos) => {
    const todosListByState: Record<TodoStates, Todo[]> = {
        [TodoStates.TODO]: [],
        [TodoStates.IN_PROGRESS]: [],
        [TodoStates.DONE]: [],
    };

    for (const todoId in todos) {
        const todo = todos[todoId];
        todosListByState[todo.state].push(todo);
    }

    return todosListByState;
};

export const getTodosByState = (todosStateService: TodoStateService) => {
    const todos = todosStateService.selectAll();

    return orderTodosByState(todos);
};
