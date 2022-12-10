import React from "react";
import "./App.css"
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
 import Home from "./components/Home";
 import Add from "./components/Add"
import Metamask from "./components/Metamask"
const App = () => {
 return (
   <div className="appbody">
     {/* <Navbar /> */}
     <Routes>
       <Route exact path="/" element={<Home />} /> 
       <Route exact path="/add" element={<Add />} /> 
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/metamask" element={<Metamask />} />
       <Route path="/recordlist" element={<RecordList />} />
     </Routes>
   </div>
 );
};
 
export default App;