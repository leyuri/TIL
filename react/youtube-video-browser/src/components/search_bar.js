import React, { Component }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
// import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            term: this.props.term
        }
    }

    change(term) {
        this.setState({term: term});
        // this.setState({term}); 도 같음
    }

    render() {
        return (


            <div className ="nav">
            <AppBar position="static" color="secondary">
              <Toolbar>
                <IconButton
                  edge="start"
                  className
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
                <Typography className variant="h6" noWrap>
                   YOUTUBE
                </Typography>
                <div className="search">

                <InputBase
                variant="outlined"
                placeholder="Search…"
                classes
                inputProps={{ 'aria-label': 'search' }}
                value={this.state.term}
                onChange={(event) => {
                    this.change(event.target.value);
                }}
                
                />
                </div>

                
                <div className>
                <SearchIcon 
                variant="outlined" color="inherit" 
                onClick={() => {
                    this.props.onChange(this.state.term);
                }}> 
                    
                </SearchIcon>
                </div>

              </Toolbar>
            </AppBar>
          </div>



        );
    }
}



export default SearchBar;


