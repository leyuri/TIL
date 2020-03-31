import React, { Component }from 'react';


class SearchBar extends Component {

    render() {
        return (
            <div className="input-group mb-3">
            <input type="text" className="form-control" 
            placeholder="Search" 
            aria-label="Search" 
            aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-info" type="button" id="button-addon2">Search</button>
            </div>
            </div>
        );
    }
}



export default SearchBar;