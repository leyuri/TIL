import React, { Component }from 'react';
import Square from './Square';

class Board extends Component {


    renderRow(rowNum) {
        return (
            <div className= 'row'>
                <Square value={rowNum * 3 + 0 }/>
                <Square value={rowNum * 3 + 1 }/>
                <Square value={rowNum * 3 + 2 }/>       
            </div>
        )
    }


    render() {
        const status = "Next player: X";

        return (
            <div>
                <div class="status">{status}</div>
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