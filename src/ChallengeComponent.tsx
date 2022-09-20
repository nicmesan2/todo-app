import React, {useCallback, useEffect, useMemo} from "react";

import { TodoStates } from "entities/Todo.entity";
import { useTodoState } from "store";
import { AddTodoInput, TodoListColumn } from "shared/components";

function ChallengeComponent() {
    const {
        moveToPreviousState,
        moveToNextState,
        isChangeToNextStatePossible,
        isChangeToPreviousStatePossible,
        addTodo,
        todosByState,
        initTodosFromApi,
    } = useTodoState();


    useEffect(() => {
        initTodosFromApi()
    }, []);


    const handleCreateNewTodo = useCallback(
        (newTodoDescription: string) => {
            addTodo(newTodoDescription);
        },
        [addTodo]
    );

    const todosColumns = useMemo(() => {
        if (!todosByState) return null

        return Object.keys(TodoStates).map((todoState) => {
            const handleLeftClick = isChangeToPreviousStatePossible(todoState) ? moveToPreviousState : null;
            const handleRightClick = isChangeToNextStatePossible(todoState) ? moveToNextState : null;

            const titleLabels = {
                [TodoStates.TODO]: "To do",
                [TodoStates.IN_PROGRESS]: "In progress",
                [TodoStates.DONE]: "Done",
            };

            return (
                <div
                    data-testid={`${todoState}-column`}
                    key={todoState}
                    style={{
                        flex: "1 1 0%",
                        height: "100%",
                        overflow: "hidden",
                        padding: "0 16px",
                    }}
                >
                    <TodoListColumn
                        title={titleLabels[todoState as TodoStates]}
                        onLeftClick={handleLeftClick}
                        onRightClick={handleRightClick}
                        todos={todosByState[TodoStates[todoState as TodoStates]]}
                    />
                </div>
            );
        });
    }, [todosByState]);

    if (!todosByState) {
        return (
            <div style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                display: "flex",
                flex: 1
            }}>Loading....</div>
        )
    }

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Todo List!</h2>
            <div style={{ display: "flex", gap: 16, padding: 12, flex: 1, overflow: "hidden" }}>{todosColumns}</div>
            <div style={{ padding: "12px 24px", flex: "0 0 auto" }}>
                <AddTodoInput onSubmit={handleCreateNewTodo} />
            </div>
        </>
    );
}

export default ChallengeComponent;
