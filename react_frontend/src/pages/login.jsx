import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const Title = styled.h1`
  margin-bottom: 30px;
`

const PageContainer = styled.div`
    height: 40rem;
    width: 100%;
    padding: 0 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default class Login extends React.Component{
    render(){
        if (this.props.isLoading){
            return (
                <PageContainer>
                    <Title>Loading ...</Title>
                </PageContainer>
            )
        }
        return (
            <PageContainer>
                <Title>A campus event aggregation platform, <br/> customized for you.</Title>
                <Button onClick={this.props.login}>Join now</Button>
            </PageContainer>
        )
    }
}