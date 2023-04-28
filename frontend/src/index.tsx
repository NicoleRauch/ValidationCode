import React from "react";
import {createRoot} from "react-dom/client";

import App from "./App";

const start: HTMLElement | null = document.getElementById("start");
if (start !== null) {
    const root = createRoot(start);
    root.render(<App />);
}
