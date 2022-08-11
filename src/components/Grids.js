import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { confirm } from "react-confirm-box";
import Timer from './Timer';


// import new sets of charms
import Clam from './../assets/charms-icons/clam.png'
import Dolphin from './../assets/charms-icons/dolphin.png'
import Lobster from './../assets/charms-icons/lobster.png'
import PalmTree from './../assets/charms-icons/palm_tree.png'


import { renderBoard } from '../layout/utils.js';

import styled from 'styled-components'

const Box = styled.div`
    width: 80px;
    height: 80px;
    margin:5px;
    border-radius: 10px; 
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;

@media (max-width: 834px) {
  background-color: #fff !important;
  width: 70px;
  height: 70px;
}

@media (max-width: 354px) {
  width: 66px;
  height: 66px;
}
`;

const GridItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 365px;
  width: 100%;

  @media (max-width: 834px) {
    max-width: 307px;
  }
`;


class Grids extends Component {

    img_1 = <img src={Clam} draggable="true" alt="" width="60" height="62" />;
    img_2 = <img src={Dolphin} draggable="true" alt="" width="60" height="62" />;
    img_3 = <img src={Lobster} draggable="true" alt="" width="60" height="62" />;
    img_4 = <img src={PalmTree} draggable="true" alt="" width="60" height="62" />;
    counter = 0;
    constructor() {
        super();
        this.initBoard();
        this.resetAfter24Hours();
        
          
        

    }
    handleDragOver = (event) => {
        event.preventDefault();
    };
    initBoard = () => {
        this.renderBoard = JSON.stringify(renderBoard());
        this.dataGrid = JSON.parse(this.renderBoard).renderGrid;
        this.finalResult = JSON.parse(this.renderBoard).finalResult;
        this.state = {
            sudukoPuzzle: [...this.dataGrid], selectedIndex: 0, wrongSelection: false,
            blockCell: this.countEmptyCell(), selectedRow: 0, selectedCol: 0, dragEnd: [], startTimer: false, openMsg: false,
            resetTime: JSON.parse(this.renderBoard).resetTime,
        };
    }

    handleDragStart = (task) => {
        console.log('touchmove')
        this.state = {
            sudukoPuzzle: this.dataGrid, selectedIndex: task, wrongSelection: false, openMsg: false,
            blockCell: this.countEmptyCell(), selectedRow: 0, selectedCol: 0, dragEnd: [...this.state.dragEnd],
            startTimer: true, resetTime: this.state.resetTime
        };
    }

    handleDoneDrop = (event) => {
        const data = event.dataTransfer.getData('id');
    };

    handleToDoDrop = (event, row, col) => {
        console.log('touchend')
        let wrongSelection = false;
        const dragEnd = [...this.state.dragEnd];
        if (this.state.sudukoPuzzle[row][col].data === 0 && this.state.selectedIndex !== 0) {
            this.dataGrid[row][col].data = this.state.selectedIndex;
            if (this.finalResult[row][col] !== this.state.selectedIndex) {
                this.dataGrid[row][col].error = 1;
                this.dataGrid[row][col].success = 0;
                wrongSelection = true;
            } else if (this.finalResult[row][col] === this.state.selectedIndex) {
                this.dataGrid[row][col].error = 0;
                this.dataGrid[row][col].success = 1;
                wrongSelection = false;
            }
            dragEnd.push([row, col]);
            this.setState({
                sudukoPuzzle: this.dataGrid, selectedIndex: 0, wrongSelection: wrongSelection,
                blockCell: this.countEmptyCell(), selectedRow: row, selectedCol: col,
                dragEnd: dragEnd,
                startTimer: true,
                openMsg: false,
                resetTime: this.state.resetTime
            });
        } else {
            this.setState({
                sudukoPuzzle: this.dataGrid, selectedIndex: 0, wrongSelection: wrongSelection, blockCell: this.countEmptyCell(),
                dragEnd: dragEnd,
                startTimer: true,
                openMsg: false,
                resetTime: this.state.resetTime
            });
        }

        this.successAlert();
    };

    successAlert = async () => {
        let notMatch = true;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.dataGrid[row][col].data !== this.finalResult[row][col]) {
                    notMatch = false;
                    break;
                }
            }
        }
        if (notMatch) {
            this.setState({
                sudukoPuzzle: this.state.sudukoPuzzle, selectedIndex: 0, wrongSelection: this.state.wrongSelection, blockCell: this.countEmptyCell(),
                dragEnd: this.state.dragEnd,
                startTimer: false,
                resetTime: this.state.resetTime
            });

            setTimeout(() => {
                window.location.replace("./completed");
            }, 3000)
        }
        this.counter++;
    }

    countEmptyCell = () => {
        let counter = 0;
        const count = this.dataGrid.filter(cellPosition => cellPosition.filter(res => {
            if (res.data !== 0) {
                counter++;
            }
        }));
        return counter;
    }

    reversePosition = (event) => {

        if (this.state.dragEnd.length !== 0) {
            const lastSelection = [...this.state.dragEnd];
            this.dataGrid[lastSelection[lastSelection.length - 1][0]][lastSelection[lastSelection.length - 1][1]].success = 0;
            this.dataGrid[lastSelection[lastSelection.length - 1][0]][lastSelection[lastSelection.length - 1][1]].error = 0;
            this.dataGrid[lastSelection[lastSelection.length - 1][0]][lastSelection[lastSelection.length - 1][1]].data = 0;
            lastSelection.pop();
            this.setState({
                sudukoPuzzle: this.dataGrid, selectedIndex: 0, wrongSelection: false,
                blockCell: this.countEmptyCell(), selectedRow: 0, selectedCol: 0,
                dragEnd: lastSelection,
                startTimer: true,
                openMsg: false,
                resetTime: this.state.resetTime
            });
        }
    }
    gameReset = () => {
        if (this.state.dragEnd.length !== 0) {
            this.renderBoard = JSON.stringify(renderBoard());
            this.dataGrid = JSON.parse(this.renderBoard).renderGrid;
            this.finalResult = JSON.parse(this.renderBoard).finalResult;
            this.setState({
                sudukoPuzzle: [...this.dataGrid], selectedIndex: 0, wrongSelection: false,
                blockCell: this.countEmptyCell(), selectedRow: 0, selectedCol: 0, dragEnd: [], startTimer: false, openMsg: false,
                resetTime: JSON.parse(this.renderBoard).resetTime
            });
        }
    }

    resetAfter24Hours() {
        setInterval(() => {
            var d = new Date(); // for now
            if (d.getHours() == 23 && d.getMinutes() == 59 && (d.getSeconds() > 55 || d.getSeconds() < 59) && !this.state.startTimer) {
                this.gameReset();
            }
        }, 1000);
    }
    componentDidMount() { }
    render() {
        const { blockCell } = this.state;

        return (
            <div className='flex-container'>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={4} className="item1">
                            <div className='timer'><Timer time={this.state.startTimer} resetTime={this.state.resetTime}/></div>
                            <GridItems className='grid-items'>
                                <Row> {
                                    this.state.sudukoPuzzle && this.state.sudukoPuzzle.map((res, row) =>

                                    (res && res.map((finalRen, col) =>
                                        <Box id={`box_${row}_${col}`} className={`box ${finalRen.error === 1 ? 'error' : ''}${finalRen.success === 1 ? 'success' : ''}`} key={`box_${row}_${col}`} onDragOver={(event) => this.handleDragOver(event)}
                                        onDrop={(e) => this.handleToDoDrop(e, row, col)} onTouchEnd={(e) => this.handleToDoDrop(e, row, col)}>
                                            {finalRen.data === 1 && this.img_1}
                                            {finalRen.data === 2 && this.img_2}
                                            {finalRen.data === 3 && this.img_3}
                                            {finalRen.data === 4 && this.img_4}
                                        </Box>
                                    ))


                                    )
                                }</Row>
                                <div className='grid-button'>
                                    <button id="btn__reset" onClick={this.gameReset}>RESET</button>
                                    <button id="btn__reset" onClick={this.reversePosition}>UNDO</button>
                                </div>
                            </GridItems>
                        </Col>

                        <Col lg={1}></Col>
                        <Col sm={12} md={12} lg={5} className="item2">
                            <div className="help__guide">
                                <div className="help__guide--headline-how-to">
                                    <h4>HOW TO PLAY</h4>
                                </div>
                                <div className="help__guide--paragraph">
                                    <p>Logic based, charm placement puzzle.
                                        The objective is to fill 6x6 grid with charms, so that each column, each row and each of the none 3x3 subgrids contain all 9 charms.
                                    </p>
                                </div>
                            </div>
                            <div className="help__guide--container">
                                <div className="help__guide--headline">
                                    <h4 className="desktop">DRAG AND DROP CHARMS</h4>
                                    <h4 className="smaller-devices">SELECT AND PLACE CHARMS</h4>
                                </div>
                                <div className='rounded__box' onMouseDown={this.props.data}>
                                    <div
                                        className="rounded__box--image"
                                        style={{ backgroundImage: `url(${Clam})` }}
                                        onDragOver={(e) => this.handleDragOver(e)}
                                        onDrop={(e) => this.handleDoneDrop(e)}>
                                        <img src={Clam} alt="" draggable onTouchStart={() => this.handleDragStart(1)} onDragStart={() => this.handleDragStart(1)} />


                                    </div>

                                    <div
                                        className="rounded__box--image"
                                        style={{ backgroundImage: `url(${Dolphin})` }}
                                        draggable="true"
                                    >
                                        <img src={Dolphin} alt="" onTouchStart={() => this.handleDragStart(2)} draggable onDragStart={() => this.handleDragStart(2)} />
                                    </div>

                                    <div
                                        className="rounded__box--image"
                                        style={{ backgroundImage: `url(${Lobster})` }}
                                        draggable="true"
                                    >
                                        <img src={Lobster} alt="" draggable  onTouchStart={() => this.handleDragStart(3)} onDragStart={() => this.handleDragStart(3)} />
                                    </div>

                                    <div
                                        className="rounded__box--image"
                                        style={{ backgroundImage: `url(${PalmTree})` }}
                                        draggable="true"
                                    >
                                        <img src={PalmTree} alt="" draggable onTouchStart={() => this.handleDragStart(4)} onDragStart={() => this.handleDragStart(4)} />
                                    </div>

                                </div>


                            </div>
                        </Col>
                    </Row>
                    {this.state.wrongSelection && <p className='wrongSelection'><span>charms outlined red if placed in wrong position</span></p>}
                    {!this.state.wrongSelection && <p className='wrongSelection'><span>board starts with {blockCell} filled in blocks</span></p>}

                </Container>
            </div>
        );
    }
}

export default Grids;