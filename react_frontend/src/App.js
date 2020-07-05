import React, {useContext, Component, useImperativeHandle, useReducer} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import HomePage from "./pages/home.jsx";
import SignupForm from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import { Auth0Context } from './contexts/auth0-context';
import Login from './pages/login'
import AllEvents from './pages/allevents.jsx'

function App(){
    const { user, loginWithRedirect, isLoading} = useContext(Auth0Context);

    const checkUserInDB = async (user) => {
      let res = await fetch("./api/checkUserInDB/" + user.email, {method: "GET"})
      let json = await res.json()
      return json['userInDB']
    }

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
              let userInDB = checkUserInDB(user)
              return userInDB ? 
                    (<Redirect to={{pathname: "/home"}}></Redirect>)
                    : (<SignupForm email ={user.email}/>);
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
