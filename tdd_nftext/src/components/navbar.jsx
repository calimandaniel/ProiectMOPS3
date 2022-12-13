import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="navbar" expand="sm">
      
      {/* <Navbar.Toggle className="toggle" aria-controls="responsive-navbar-nav" /> */}
      <Navbar.Collapse className="navbar-links" id="responsive-navbar-nav">
        <Nav className="ms-auto">
        <Navbar.Brand
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          navigate("/", { replace: true });
        }}
      >
        NFTEXT
      </Navbar.Brand>
          <Nav.Link
            className="navlink"
            onClick={(e) => {
              e.preventDefault();
              navigate("/add", { replace: true });
            }}
          >
            Add
          </Nav.Link>
          <Nav.Link
            className="navlink"
            onClick={(e) => {
              e.preventDefault();
              navigate("/documents", { replace: true });
            }}
          >
            Documents
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;

// import React from 'react';
// import { Link } from "react-router-dom";
// const NavBar = () => {
//     return (
//         <div>
//             <li>
//                 <Link to="/documents">Documents</Link>
//             </li>
//             <li>
//                 <Link to="/home">Home</Link>
//             </li>
//         </div>
//     );
// }
// export default NavBar;
