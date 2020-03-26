import React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        return (
            <div>
                <div class="status">Next player: X</div>
                <div>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                </div>
                <div>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                </div>
                <div>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                </div>
            </div>
        );
    }
}

// JSX == XML
// 1. Root
// 2. 열린 tag 닫힌 tag

export default Board;