import React, { useMemo } from "react";

type Todo<T> = T & { description: string; id: string };

interface TodoCardProps<T> {
    todo: Todo<T>;
    onRightClick?: (todo: Todo<T>) => void;
    onLeftClick?: (todo: Todo<T>) => void;
}

function TodoCardComponent<T>({ todo, onRightClick, onLeftClick }: React.PropsWithChildren<TodoCardProps<T>>) {
    const handleLeftClick = () => {
        if (onLeftClick) {
            onLeftClick(todo);
        }
    };

    const handleRightClick = () => {
        if (onRightClick) {
            onRightClick(todo);
        }
    };

    const styles = useMemo(
        () =>
            ({
                alignItems: "center",
                width: "100%",
                display: "flex",
                border: "1px solid grey",
                minHeight: "150px",
                boxSizing: "border-box",
                justifyContent: "space-between",
                padding: "8px",
            } as React.CSSProperties),
        []
    );

    return (
        <div style={styles} data-testid={`todoCard`}>
            {/*If not function is passed, left button should be disabled*/}
            <button disabled={!Boolean(onLeftClick)} onClick={handleLeftClick}>
                Left
            </button>
            <p>{todo.description}</p>
            {/*If not function is passed, right button should be disabled*/}
            <button disabled={!Boolean(onRightClick)} onClick={handleRightClick}>
                Right
            </button>
        </div>
    );
}

export default TodoCardComponent;
