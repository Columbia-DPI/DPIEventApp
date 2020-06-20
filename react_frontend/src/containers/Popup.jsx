import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    padding: 20px;
    height: 100%;
    width: 100%;
    
`

export default class Popup extends Component {
    render(){
        return (
            <Container>
                hello!
            </Container>
        )
    }
}