import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./pages/home.jsx";
import { Auth0Context } from './contexts/auth0-context';
import { LoginTest } from './pages/loginTest'

function App(){
    const auth0 = useContext(Auth0Context);

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
          <div>Hello Again
            {auth0.user && (
              <p>{auth0.user.name}</p>
            )}
          </div>
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

        <Route
          exact={true}
          path="/login-test"
          render={()=>(
            <LoginTest />
          )}
        />
        </div>
        </BrowserRouter>
    );
}

export default App;
