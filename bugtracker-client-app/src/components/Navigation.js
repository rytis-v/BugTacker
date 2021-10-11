import buglogo from '../bug.svg'
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import CreateTicketModal from './CreateTicketModal';
import { Form, FormControl} from 'react-bootstrap';
import SearchModal from './SearchModal';


function Navigation(props) {

  const [searchValue, setSearchValue] = useState("");

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={buglogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Bug Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/alltickets">List of bugs</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search ticket by ID"
              className="me-2"
              aria-label="Search"
              onChange={e => setSearchValue(e.target.value)}
            />
            <SearchModal searchValue={searchValue} buttonName="Search" tickets={props.tickets} setTickets={props.setTickets}/>
          </Form>
          <CreateTicketModal tickets={props.tickets} setTickets={props.setTickets}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;