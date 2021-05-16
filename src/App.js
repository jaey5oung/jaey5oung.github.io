/* eslint-disable */

import './App.css';
import React, { useState, useContext, lazy, Suspense } from 'react';
import { Navbar, NavDropdown, Nav, Button, Jumbotron } from 'react-bootstrap';
import Data from './data';
// import Detail from './Detail';
let Detail = lazy(() => {
  return import('./Detail.js');
});

import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';
import Jordan from './Jordan';

let 재고context = React.createContext();
//createContext 범위생성
//같은 값을 공유할 HTML을 범위로 싸매기

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

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
            <select name="test" size="20"style={{width:"45px", height:"20px"}} multiple>
              <option value="가나다라">가나나라</option>
              <option value="가나다라마">가나나라마</option>
              <option value="가나다라마바">가나나라마바</option>
              <option value="가나다라마바사">가나나라마바사</option>
              <option value="가나다라마바사아">가나나라마마바사아</option>
            </select>
          </Jumbotron>
          <div className="container">
            <재고context.Provider value={재고}>
              {/* 벨류안에는 공유하고싶은 데이터 */}
              <div className="row">
                {shoes.map((item, i) => {
                  return <Card shoes={shoes[i]} key={i} />;
                })}
              </div>
            </재고context.Provider>
          </div>
        </Route>
        <Route exact path="/detail/:id">
          <Suspense fallback={<div>로딩중이에요</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
          </Suspense>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/jordan">
          <Jordan></Jordan>
        </Route>
      </Switch>
      <button
        className="btn btn-primary"
        onClick={() => {
          axios
            .get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              console.log(result.data);
              shoes변경([...shoes, ...result.data]);
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
  let 재고 = useContext(재고context);
  let history = useHistory();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push('/detail/' + props.shoes.id);
      }}
    >
      <img src={props.shoes.picture} style={{ width: '100%' }} />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
      <Test></Test>
    </div>
  );
}
function Test() {
  let 재고 = useContext(재고context);
  return <p>재고 : {재고}</p>;
}

export default App;
