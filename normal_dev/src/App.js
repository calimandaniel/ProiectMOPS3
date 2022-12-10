import logo from './logo.svg';
import './App.css';
import { Switch,  BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Add from "./components/Add"
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
