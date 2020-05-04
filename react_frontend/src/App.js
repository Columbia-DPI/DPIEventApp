import React, {Component} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import HomePage from "./pages/home.jsx";
import SignupForm from './pages/signup.jsx';

function App(){
    return (
      <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"/>
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
            <Container textAlign='center'>
              <SignupForm />
            </Container>
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
        </div>
    );
}

export default App;
