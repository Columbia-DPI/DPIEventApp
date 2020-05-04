import React, {Component} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./pages/home.jsx";
function App(){
    return (
      <BrowserRouter>
        <div>
        <Route
          exact={true}
          path="/"
          render={()=>(
            <HomePage />
          )}
        />

        <Route
          exact={true}
          path="/login"
          render={()=> (
            <div>Hello Again</div>
          )}
        />

        <Route
          exact={true}
          path="/allevents"
          render={()=>(
            <div>Hello hello hello</div>
          )}
        />
        </div>
        </BrowserRouter>
    );
}

export default App;
