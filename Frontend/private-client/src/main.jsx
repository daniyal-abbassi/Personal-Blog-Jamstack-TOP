import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import Admin from "../../src/pages/Admin/Admin";
import { BrowserRouter } from "react-router-dom";
import { MyProvider as UserProvider } from "./UserProviders";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter basename="/admin">
          <Admin />
          <Toaster />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
