import {TodoApiService} from "services";
import {TodoStates} from "../entities";

export const useTodoApiAdapter: () => TodoApiService = () => {
    const get = async () => {
        const response = await fetch('https://api.github.com/repos/every-io/demo-issues/issues?state=all')

        const todos = await response.json()

        const todosMap = todos.reduce((acc: any, todo: any) => ({
            ...acc,
            [todo.id]: {
                id: todo.id,
                createdAt: todo.created_at,
                description: todo.title,
                state: todo.state === 'closed' ? TodoStates.DONE : TodoStates.TODO
            }
        }), {})

        return todosMap

    }

    return {
        get
    }
}
