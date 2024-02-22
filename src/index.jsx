import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UseRefSample from "./UseRefsample";
import TodoListProject from "./02TodoList/TodoListProject";
import TodoReducer from "./03TodoReducer/TodoReducer";
import TodoOptimize from "./04OptimizeUseMemo/TodoOptimize";
import TodoContextAPI from "./05TodoContext/TodoContextAPI";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <UseRefSample /> */}
    {/* <TodoListProject /> */}
    {/* <TodoReducer /> */}
    {/* <TodoOptimize /> */}
    <TodoContextAPI />
  </React.StrictMode>,
);
