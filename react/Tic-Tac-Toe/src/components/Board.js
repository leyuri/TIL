import React, { Component }from 'react';
import Square from './Square';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        const { squares, xIsNext } = this.state;
        const arr = squares.slice();
        if( arr[i]){
            return;
            //이미 수를 놓으면 아무것도 할 수 없도록
        }

        arr[i] = xIsNext ? "X" : "O";
        this.setState({
            squares: arr,
            xIsNext: !xIsNext
        })
    }

    renderSquare(no) {
        return (
            <Square 
            value={this.state.squares[no]}
            onClick={() => {
                this.handleClick(no);
            }}
            />);
    }


    renderRow(rowNum) {
        return (
            <div className= 'row'>
                {this.renderSquare(rowNum * 3+ 0)}
                {this.renderSquare(rowNum * 3+ 1)}
                {this.renderSquare(rowNum * 3+ 2)}   
            </div>
        )
    }


    render() {
        const status = `Next player: ${this.state.xIsNext? 'X':'O'}`;

        return (
            <div>
                <div className="status">{status}</div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}

            </div>
        );
    }
}

// JSX == XML
// 1. Root
// 2. 열린 tag 닫힌 tag

export default Board;