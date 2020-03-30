import React, { Component }from 'react';
import Board from './Board';
import { Button, PageHeader, Layout, Breadcrumb, Row, Col} from 'antd';
const { Content, Footer } = Layout;

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {squares: Array(9).fill(null)}
            ],
            step: 0,
            // xIsNext: true,
        }
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
        //of를 하면 그 안에 엘리먼트로 하나씩 돈다
        for(const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
                return squares[a];
            } 
        }
        return null;
        //이긴 사람이 아직 없을 때
    }

    nextPlayer(idx) {
        return (idx % 2 === 0) ? "X" : "O"; 
    }

    handleClick(i) {
        const { step } = this.state;
        const history = this.state.history.slice(0, step + 1);
        const current = history[step];
        const squares = current.squares.slice();
        if( squares[i] || this.calculateWinner(squares)){
            return;
            //이미 수를 놓으면 아무것도 할 수 없도록
        }

        squares[i] = this.nextPlayer(step);
        this.setState({
            history: history.concat([{squares: squares}]),
            step: step + 1,
        })
    }
    goto(idx) {
        this.setState({
            step: idx,
            
        });
    }
    getMoves() {
        //map: 안에서 히스토리 한줄한줄을 출력할 것이기 대문에
        return this.state.history.map((step, idx) => {
            const desc = idx ? `Go to move #${idx}` : "Go to game🤗";
            return (
                //key가 있어야 함
          
                <li key={idx}>
                <Button type="dashed" onClick= {
                    () => {this.goto(idx);}
                }>{desc}</Button>
                <br></br>
                </li>
            );
        })
    }
    render() { 
        const history = this.state.history;
        const squares = history[this.state.step].squares;
        const winner = this.calculateWinner(squares);
        let status;
        /*let 과 const 의 차이점은 변수의 immutable 여부이다. 
        let 은 변수에 재할당이 가능하지만, const 는 변수 재선언, 
        재할당 모두 불가능하다. */
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.nextPlayer(this.state.step)}`;
        }

        return(



        <div className="game">    

        <Layout className="layout">
            <div className="logo" />
                <PageHeader 
                className="site-page-header"
                title=" Game : Tic-Tac-Toe 🎮"
                />
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>Game</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">

            <div className="game-info">
            <div> 
                {status}
            </div>
            </div>
            <br></br>
            <Row>
            <Col span={12}>
            <div className="game-board">
            <Board 
            squares={squares} 
            onClick={(i) => this.handleClick(i)}/>
            </div>

            </Col>

            <Col span={12}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
            (this.state.step >= 1) && (<Button type="primary" onClick={() => {
                this.setState({
                    step: this.state.step -1,
                    history: this.state.history.slice(0, this.state.step)
                });
            }}>Undo</Button>)
            }
            <br></br><br></br>
            <ol>
            {this.getMoves()}
            </ol>
            </Col>
            </Row>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020 Created by yuri lee</Footer>
        </Layout>
        </div>             
        );
    }
}

export default Game;