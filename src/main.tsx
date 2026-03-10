import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/lib/i18n";
import "./lib/ga-setup.js";

createRoot(document.getElementById("root")!).render(<App />);
