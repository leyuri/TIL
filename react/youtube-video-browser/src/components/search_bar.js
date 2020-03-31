import React, { Component }from 'react';


class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            term: this.props.term
        }
    }

    change(value) {
        this.setState({term: value});
    }

    render() {
        return (
            <div className="input-group mb-3">
            <input type="text" className="form-control" 
            placeholder="Search" 
            aria-label="Search" 
            aria-describedby="button-addon2" value={this.state.term}
            onChange={(event) => {
                this.change(event.target.value);
            }}/>
            <div className="input-group-append">
              <button className="btn btn-info" type="button" 
              onClick={() => {
                  this.props.onChange(this.state.term);
              }}
              id="button-addon2">Search</button>
            </div>
            </div>
        );
    }
}



export default SearchBar;