import logo from "./logo.svg";
import "./App.css";
import { Switch, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Documents from "./components/documents";
import NavBar from "./components/navbar";
import "./css/content.css";

function App() {
  return (
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" index element={<Add />} />
        <Route path="/documents" index element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
