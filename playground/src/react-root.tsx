import * as React from "react";
import { createRoot } from "react-dom/client";

const reactRootElement = document.getElementById("react-root");

if (!reactRootElement) throw new Error("There is no `#react-root` element.");

const App = () => {
  return <></>;
};

createRoot(reactRootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
