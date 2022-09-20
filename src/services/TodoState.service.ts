import { Todo, Todos } from "entities";

// This service manages the in-memory app storage.
// Currently using React context, but could be any other: Redux, Recoil, Jotai, Browser's local storage, etc.
export interface TodoStateService {
    selectAll: () => Todos | undefined;
    addOne: (todo: Todo) => void;
    updateOne: (todo: Todo) => void;
    setAll: (todos: Todos) => void;
}
