import React from 'react';
import logo from './../assets/Logo.svg'
import styled from 'styled-components'

const Logo = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
 
`

function SudokuLogo() {
    return (  
        <Logo>
            <img src={logo} className="App-logo" alt="logo" />
        </Logo> 
    );
}

export default SudokuLogo;