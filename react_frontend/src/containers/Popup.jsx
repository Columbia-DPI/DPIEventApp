import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
`

const ColOne = styled.div`
    width: 40%;
    height: 100%;
`

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const ColTwo = styled.div``

export default class Popup extends Component {
    render(){
        return (
            <Container>
                <ColOne><Img src={this.props.event['link']} /></ColOne>
                <ColTwo><h2>{this.props.event['title']}</h2></ColTwo>
            </Container>
        )
    }
}