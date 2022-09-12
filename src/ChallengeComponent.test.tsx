import React from "react";
import { render, fireEvent, within, screen } from "./test-utils";
import ChallengeComponent from "./ChallengeComponent";
import { LOCAL_STORAGE_KEY } from "./adapters";

const addNewTodo = (description: string) => {
    const addTodoButton = screen.getByText("Add Todo");
    const addTodoInput = screen.getByPlaceholderText("Enter description");

    fireEvent.change(addTodoInput, { target: { value: description } });
    fireEvent.click(addTodoButton);
};

describe("ChallengeComponent", () => {
    beforeEach(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    });

    test("Initial screen", () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<ChallengeComponent />);

        const title = getByText("Todo List!");
        expect(title).toBeDefined();

        const todoColumn = getByTestId("TODO-column");
        const inProgressColumn = getByTestId("IN_PROGRESS-column");
        const doneColumn = getByTestId("DONE-column");

        expect(todoColumn).toBeDefined();
        expect(inProgressColumn).toBeDefined();
        expect(doneColumn).toBeDefined();

        expect(todoColumn).toHaveTextContent("To do");
        expect(inProgressColumn).toHaveTextContent("In progress");
        expect(doneColumn).toHaveTextContent("Done");

        const addTodoButton = getByText("Add Todo");
        const addTodoInput = getByPlaceholderText("Enter description");

        expect(addTodoButton).toBeDefined();
        expect(addTodoInput).toBeDefined();

        expect(addTodoButton).toBeDisabled();
    });

    test("Add new Todo", () => {
        const { getByTestId } = render(<ChallengeComponent />);

        const todoColumn = getByTestId("TODO-column");

        const description = "1";

        addNewTodo(description);

        const todoCard = within(todoColumn).getByText(description);

        expect(todoCard).toBeDefined();

        const leftButton = within(todoColumn).getByText("Left");
        const rightButton = within(todoColumn).getByText("Right");

        expect(leftButton).toBeDisabled();
        expect(rightButton).toBeEnabled();
    });

    test("Move todo from 'todo' to 'done' and from 'done' to 'todo'", () => {
        const { getByTestId } = render(<ChallengeComponent />);

        const todoColumn = getByTestId("TODO-column");
        const inProgressColumn = getByTestId("IN_PROGRESS-column");
        const doneColumn = getByTestId("DONE-column");

        const description = "1";

        addNewTodo(description);

        let todoCard = within(todoColumn).getByTestId("todoCard");
        let rightButton = within(todoCard).getByText("Right");

        expect(todoCard).toBeDefined();
        const todoCardDescription = within(todoCard).getByText(description);
        expect(todoCardDescription).toBeDefined();

        // Move card from 'todo' to 'in progress'
        fireEvent.click(rightButton);

        todoCard = within(inProgressColumn).getByTestId("todoCard");
        rightButton = within(todoCard).getByText("Right");

        expect(todoCard).toBeDefined();

        // Move card from 'in progress' to 'done'
        fireEvent.click(rightButton);

        todoCard = within(doneColumn).getByTestId("todoCard");
        rightButton = within(todoCard).getByText("Right");

        expect(todoCard).toBeDefined();
        expect(rightButton).toBeDisabled();

        todoCard = within(doneColumn).getByTestId("todoCard");
        let leftButton = within(todoCard).getByText("Left");

        // Move card from 'done' to 'in progress'
        fireEvent.click(leftButton);

        todoCard = within(inProgressColumn).getByTestId("todoCard");
        leftButton = within(todoCard).getByText("Left");

        expect(todoCard).toBeDefined();

        // Move card from 'in progress' to 'todo'
        fireEvent.click(leftButton);

        todoCard = within(todoColumn).getByTestId("todoCard");
        leftButton = within(todoCard).getByText("Left");

        expect(todoCard).toBeDefined();
        expect(leftButton).toBeDisabled();
    });
});
