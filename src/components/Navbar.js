// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">FarmaEasy</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Clientes" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/clients/search">Pesquisa de Clientes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/clients/add">Cadastro de Clientes</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Remédios" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/medicines/search">Buscar Fórmula</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/medicines/add">Cadastro de Fórmula</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
