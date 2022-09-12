import { TodoStateService } from "services";
import { createTodo } from "entities/Todo.entity";

export const addNewTodo = (newTodoDescription: string, todosStateService: TodoStateService) => {
    // cannot add an empty TODO
    if (!newTodoDescription) return;

    const newTodo = createTodo(newTodoDescription);

    todosStateService.addOne(newTodo);
};
