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
        if( arr[i] || this.calculateWinner(squares)){
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

    calculateWinner(squares){

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]; 
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
                return squares[a];
            } 
        }
        return null;
        //이긴 사람이 아직 없을 때
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        /*let 과 const 의 차이점은 변수의 immutable 여부이다. 
        let 은 변수에 재할당이 가능하지만, const 는 변수 재선언, 
        재할당 모두 불가능하다. */
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext? 'X':'O'}`;
        }

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