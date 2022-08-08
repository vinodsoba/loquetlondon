import React from 'react';
import BackgroundImg from './../assets/main_desktop_background.png'
import MobileBackgroundImg from './../assets/main_mobile_background.png'
import ShareIcon from './../assets/share-icon-01.svg'
import Logo from '../components/Logo';
import styled from 'styled-components'


const Button = styled.button `
    max-width: ${props => props.formButton || '233px' };
    height: 34px;
    background: #332F2F;
    border-radius: 23px;
    color: #fff;
    position: relative;
    width: 100%;
    margin-top: 2em;
    margin-bottom: 2em;

`;

const Wrapper = styled.div `
    background-image: url(${BackgroundImg});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;

    @media (max-width: 834px) {
        background-image: url(${MobileBackgroundImg});
        height: 100vh;

    }
`; 

export default class Completed extends React.Component {

    constructor(props){
        super(props);
            this.handleClick = this.handleClick.bind(this);
        
    }

    handleClick() {
        alert("button is working");
    }
    
    render() {
        
        return (
            <Wrapper>
                <Logo />
                 <div className="completed__task">
                 <span className='completed__task--counter' >You completed it in 0.52 seconds!</span>
                 <button onClick={this.handleClick}>SHARE <span style={{ position: 'absolute', right: '13px', top: '3px' }}><img src={ShareIcon} width="20" height="20" /></span></button>
                    <div className='form-thankyou'>
                        <div className='thank__you--container'>
                            <h4>Thank you</h4>
                            <p>Have a wonderful, adventure filled summer!</p>
                            <a href='https://www.loquetlondon.com/'>Take me back to Loquet London</a>
                        </div>
                    </div>
                </div>
            </Wrapper>            
        )
    }
}
