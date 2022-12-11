import logo from "./logo.svg";
import "./App.css";
import { Switch, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Documents from "./components/documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" index element={<Add />} />
        <Route path="/documents" index element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
