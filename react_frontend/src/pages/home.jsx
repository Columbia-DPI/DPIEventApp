import React, { Component, useContext } from "react";
import Auth0PContext, { Auth0Context } from '../contexts/auth0-context';

function HomePage() {
    const { isLoading, user, loginWithRedirect, logout } = useContext(Auth0Context);
    
    return(
      <div>
        Dumbeiwfjwoijfo
        { !isLoading && !user &&(
          <button onClick={loginWithRedirect}>Login</button>
        )}
        { isLoading && (
          <p>Loading... ...</p>
        )}
        { !isLoading && user &&(
          <div>
            <p>Hello {user.name}!!!</p>
            <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
            >Logout</button>
          </div>
        )}
      </div>
    );
}

export default HomePage;
