import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
`

const RowOne = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
`

const RowTwo = styled.div`
    text-align: left;
    padding-top: 30px;
`

const ColOne = styled.div`
    width: 60%;
    height: 100%;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
`

const ColTwo = styled.div` 
    padding-top: 30px;  
    padding-left: 30px;
    text-align: center;
`

const EventLink = styled.div`
    position: absolute;
    bottom: 40px;
    left: 40px;
`

export default class Popup extends Component {
    render(){
        return (
            <Container>
                <RowOne>
                    <ColOne><Img src={this.props.event['link']} /></ColOne>
                    <ColTwo>
                        <h1>{this.props.event['title']}</h1>
                        <h3>Organizer </h3>
                        <p>{this.props.event['organizer']}</p>
                        <h3>Tags</h3>
                        <p>{this.props.event['tags'].join(", ")}</p>
                        <h3>Time </h3>
                        <p>{this.props.event['timestamp']}</p>
                        <h3>Location</h3>
                        <p>{this.props.event['location']}</p>
                    </ColTwo>
                </RowOne>
                <RowTwo>
                    <h3>Description</h3>
                    <p>{this.props.event['description']}</p>
                    <EventLink>
                        <p><b>Event link: </b>{this.props.event['link']}</p>
                </EventLink>
                </RowTwo>
            </Container>
        )
    }
}
