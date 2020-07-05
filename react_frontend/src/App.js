import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import HomePage from "./pages/home.jsx";
import SignupForm from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import { Auth0Context } from './contexts/auth0-context';
import { Menu } from "semantic-ui-react";
import Login from './pages/login'
import AllEvents from './pages/allevents.jsx'

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
            if (user && !isLoading){
              return (<SignupForm email ={user.email}/>);
            } else {
              return (<div><Login login={loginWithRedirect} isLoading={isLoading}></Login></div>);
            }
          }}
        />
        
        <Route exact path="/home" component={HomePage} />
        
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
            <AllEvents />
          )}
        />

        </div>
        </BrowserRouter>
        </div>
    );
}

export default App;
