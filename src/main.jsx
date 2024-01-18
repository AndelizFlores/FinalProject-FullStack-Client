import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth.context.jsx";
import { GameProvider } from "./context/games.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
