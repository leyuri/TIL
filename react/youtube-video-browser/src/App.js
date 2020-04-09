import React from 'react';
import './App.css';
import * as youtubesearch from "youtube-search";
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import { Row, Container, Col} from 'react-bootstrap';



// AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA

const GOOGLE_KEY = "AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA"


class App extends React.Component {

  

  constructor(props) {
    super(props);

    this.state = {
      term: '전지현',
      videos: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this.search(this.state.term);
  }

  search(term){
    this.setState({term: term});
    youtubesearch(term, {key: GOOGLE_KEY}, (err, results) => {
      if(err) return console.log(err);
      console.log(results);
      this.setState({
        videos: results,
        selectedVideo: results[0]
      })
      // console.log(results);
    }); 
  }

  

  render() {

    return (
      <div>
      <SearchBar term={this.state.term} onChange={(term) => {this.search(term);}}/>
        <Container>
          <Row>
          <Col sm={8}>

          <VideoDetail video={this.state.selectedVideo}/>
            
          </Col>
          <Col sm={4}>
          <VideoList videos={this.state.videos}
              onItemSelect={(video) => {
                this.setState({selectedVideo: video});
              }}
            />


          </Col>
        </Row>
      </Container>

    </div>




    );

  }

}


export default App;
