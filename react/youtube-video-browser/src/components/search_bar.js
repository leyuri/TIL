import React, { Component }from 'react';
import { ButtonToolbar, Button, Card, Navbar, NavDropdown, Nav, Form, FormControl, Container} from 'react-bootstrap';

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
            <Navbar bg="light" expand="lg" >
              <Navbar.Brand href="#home">youtube</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#link">Recommended Video</Nav.Link>
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
                  <Button variant="outline-success"     
                    onClick={() => {
                        this.props.onChange(this.state.term);
                    }}>Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>

          </div>
 



        );
    }
}



export default SearchBar;


