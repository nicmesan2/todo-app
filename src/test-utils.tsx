import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { TodoStateProvider } from "./store";
import { useTodoStateMemoryAdapter } from "adapters";
import {useTodoApiAdapter} from "./adapters/TodoApi.adapter";

const AllTheProviders: React.FC = ({ children }) => {
    return <TodoStateProvider useTodoStateService={useTodoStateMemoryAdapter} useTodoApiService={useTodoApiAdapter}>{children}</TodoStateProvider>;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
