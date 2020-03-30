import React, { Component }from 'react';
import Square from './Square';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null)
        }
    }

    handleClick(no) {
        const arr = this.state.squares.slice();
        arr[no] = "X";
        this.setState({
            squares: arr
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
        const status = "Next player: X";

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