import React, { Component }from 'react';


function Square(props) {
    return (
        <button className='square' 
        onClick={ () => {
            props.onClick();
        }}
        >{props.value}</button>
        );

}



    // onClick() {
    //     this.setState({
    //         value: (this.state.value === "X" ? "O" : "X")
    //     });
    // }

    //this.props = {value: "1"}

export default Square;