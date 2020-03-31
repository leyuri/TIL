import React from 'react';
import './App.css';
import * as youtubesearch from "youtube-search";
import SearchBar from './components/search_bar';
import VideoItem from './components/video_item';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


// AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA

const GOOGLE_KEY = "AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA"

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      term: '명지대',
      videos: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this.search();
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
      <div className="App container mt-3">
        <SearchBar term={this.state.term} onChange={(term) => {
          this.search(term);
        }}/>
        <div className="row">
          <div className="col-8">
          <VideoDetail video={this.state.selectedVideo}/>
          </div>
          <div className="col-4">
            <VideoList videos={this.state.videos}
              onItemSelect={(video) => {
                this.setState({selectedVideo: video});
              }}
            />
  
          </div>
        </div>
  
  
  
      </div>
    );

  }

}


export default App;
