import React, { FC } from "react";
import { createRoot } from "react-dom/client";

const App: FC<{}> = ({}) => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
