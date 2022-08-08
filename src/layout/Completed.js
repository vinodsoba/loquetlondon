import React from 'react';
import BackgroundImg from './../assets/main_desktop_background.png'
import MobileBackgroundImg from './../assets/main_mobile_background.png'
import ShareIcon from './../assets/share-icon-01.svg'
import Logo from '../components/Logo';
import styled from 'styled-components'
import Form from '../components/Form';

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

const Wrapper = styled.div`
    background-image: url(${BackgroundImg});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    

    @media (max-width: 834px) {
        background-image: url(${MobileBackgroundImg});
        background-size: cover;
        height: 100%;
    }
`; 

export default class Completed extends React.Component {

    constructor(props){
        super(props);
            this.handleClick = this.handleClick.bind(this);
            this.timer = JSON.parse(localStorage.getItem('timer'));
        
    }
    handleClick() {
        alert("button is working");
    }
    handleWhatsApp() {
        window.open('https://wa.me/79766544432?text='+ document.getElementById('timerText').innerText)
    }
    render() {
        
        return (
            <Wrapper>
                <Logo />
                 <div className="completed__task">
                 <p id="timerText" style={{ fontFamily: 'Fournier', fontSize: '21px', color: '#fff'}}>You completed it in
                        <span className='digits min'>{
                            this.timer.currentMin.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                            :</span>
                        <span className='seconds'>{this.timer.currentSec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</span>
                        seconds!</p>
                    <button onClick={this.handleWhatsApp}>SHARE <span style={{ position: 'absolute', right: '13px', top: '3px' }}><img src={ShareIcon} alt="share icon" width="20" height="20" /></span></button>

                    <div className='form'>
                        <h4>Congratulations! You completed Loquet Suduko!</h4>
                        <p>For your chance to win a classic locket with exclusive Cynthia Rowley charm and Cynthia Rowley swimsuit simply add your details below.  Winners will be announced on the 31st August. Good luck!</p>

                        <div className='form-fields'>
                        <Form />
                        </div>
                    </div>

                    <div className="copy">Terms and Conditions apply.  *By entering this competition please acknowledge you are signing up to Loquet and Cynthia Rowley's mailing list and you can unsubscribe at any time.</div>
                </div>
            </Wrapper>            
        )
    }
}
