/* eslint-disable */

import './App.css';
import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav, Button, Jumbotron } from 'react-bootstrap';
import Data from './data';
import Detail from './Detail';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

function App() {
  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p></p>
            <p>
              <Button variant="primary" className="mainButton">
                더보기
              </Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {shoes.map((item, i) => {
                return <Card shoes={shoes[i]} key={i} />;
              })}
            </div>
          </div>
        </Route>
        <Route exact path="/detail/:id">
          <Detail shoes={shoes} />
        </Route>
        <Route path="/:id">
          <div>아무거나 적었을때 </div>
        </Route>
      </Switch>
      <button
        className="btn btn-primary"
        onClick={() => {
          

          axios
            .get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
             
              console.log(result.data);
              shoes변경([...shoes, ...result.data])
            })
            .catch(() => {
              '실패했어요';
            });
        }}
      >
        더보기
      </button>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={props.shoes.picture} style={{ width: '100%' }} />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
