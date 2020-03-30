import React, { Component }from 'react';

class Square extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null
        };
    }

    //this.props = {value: "1"}
    render() {  //JSX
        const { value } = this.state;
        return (
        <button className='square' 
        onClick={ () => {this.setState({value: 'X'})}}
        >{value}</button>
        );
    }
}

export default Square;