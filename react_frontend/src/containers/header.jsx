import React, { Component } from "react";
import '../style.css';
import styled from 'styled-components';
import { Auth0Context } from '../contexts/auth0-context'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Header extends Component {
  constructor(props){
    super(props);
  }

  static contextType = Auth0Context;

  render(){
    const logout = this.context.logout;
    return(
      <div>
        <div>
          <header style={{alignContent:"center"}}>CUBrite</header>
        </div>
        <div style={{marginLeft:"77%"}}>
          <Link to="/profile"><Button>My profile</Button></Link>
          <Button onClick={() => this.context.logout({returnTo: window.location.origin})}>Log out</Button>
        </div>
      </div>
    )
  }
}
export default Header;