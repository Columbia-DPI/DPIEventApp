import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./pages/home.jsx";
import { Auth0Context } from './contexts/auth0-context';

function App(){
    const { user, loginWithRedirect, isLoading} = useContext(Auth0Context);
    return (
      <BrowserRouter>
        <div>
        <Route
          exact={true}
          path="/"
          render={()=>{
            if (isLoading){
              return (<div>Loading...</div>);
            } else if (!user) {
              return (<div><button onClick={loginWithRedirect}>log in</button></div>);
            } else {
              return (<HomePage />);
            }
          }}
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
