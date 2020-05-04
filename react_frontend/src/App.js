import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import HomePage from "./pages/home.jsx";
<<<<<<< HEAD
import SignupForm from './pages/signup.jsx';
=======
import { Auth0Context } from './contexts/auth0-context';
>>>>>>> 4e6ff7db0e7939231ca4b238fca065d503503c00

function App(){
    const { user, loginWithRedirect, isLoading} = useContext(Auth0Context);
    return (
      <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"/>
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
<<<<<<< HEAD
            <Container textAlign='center'>
              <SignupForm />
            </Container>
=======
          <div>Hello Again</div>
>>>>>>> 4e6ff7db0e7939231ca4b238fca065d503503c00
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
