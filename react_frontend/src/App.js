import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import HomePage from "./pages/home.jsx";
import SignupForm from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import { Auth0Context } from './contexts/auth0-context';

function App(){
    const { user, loginWithRedirect, isLoading} = useContext(Auth0Context);
    return (
      <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
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
          path="/home"
          render={()=> (
            <HomePage />
          )}
        />

        <Route
          exact={true}
          path="/profile"
          render={()=> (
            <Profile/>
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
