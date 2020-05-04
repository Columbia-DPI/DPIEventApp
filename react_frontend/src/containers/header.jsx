import React, { Component } from "react";
import '../style.css';
import styled from 'styled-components';
import { Auth0Context } from '../contexts/auth0-context'

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
      <Container>
          <header>Name Placeholder</header>
          <button onClick={() => this.context.logout({returnTo: window.location.origin})}>Log out</button>
      </Container>
    )
  }
}
export default Header;