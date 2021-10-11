import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TicketTable from './components/TicketTable'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

const routes = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/alltickets" component={TicketTable}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
