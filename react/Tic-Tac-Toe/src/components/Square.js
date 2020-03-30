import React from 'react';


function Square({value, onClick}) {
    return (
        <button 
        className='square' 
        onClick={onClick}
        >{value}</button>
        );
    

}



    // onClick() {
    //     this.setState({
    //         value: (this.state.value === "X" ? "O" : "X")
    //     });
    // }

    //this.props = {value: "1"}

export default Square;