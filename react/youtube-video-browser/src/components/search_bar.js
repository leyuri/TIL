import React, { Component }from 'react';
import { ButtonToolbar, Button, Card, Navbar, NavDropdown, Nav, Form, FormControl, Container} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

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

          <div>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">youtube &nbsp;
              <svg color="red" class="bi bi-camera-video-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/>
              <path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>
            </svg>
              
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#Recommended">Recommended Video</Nav.Link>
                  <NavDropdown title="My List" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Music</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">My Love</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Travel</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Like</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">DisLike</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                    classes
                    inputProps={{ 'aria-label': 'search' }}
                    value={this.state.term}
                    onChange={(event) => {
                        this.change(event.target.value);
                    }}/>
                  <Button variant="outline-light"   
                    onClick={() => {
                        this.props.onChange(this.state.term);
                    }}>
                    <Search color="gray" size={20} />
                    </Button>
                    
                </Form>
              </Navbar.Collapse>
            </Navbar>
          <br></br>
          </div>


 



        );
    }
}



export default SearchBar;


