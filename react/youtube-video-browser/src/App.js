import React from 'react';
import './App.css';
import * as youtubesearch from "youtube-search";
import SearchBar from './components/search_bar';

// AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA

const GOOGLE_KEY = "AIzaSyBa4oPbrdMSLkzpHVtKQdbtB3eJitVUJZA"

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      video: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this.search();
  }

  search(){
    youtubesearch("BTS", {key: GOOGLE_KEY}, (err, results) => {
      if(err) return console.log(err);
      console.log(results);
      this.setState({
        video: results,
        selectedVideo: results[0]
      })
      // console.log(results);
    }); 
  }

  render() {

    return (
      <div className="App container mt-3">
        <SearchBar/>
        <div className="row">
          <div className="col-8">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  
          </div>
          <div className="col-4">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  
          </div>
        </div>
  
  
  
      </div>
    );

  }

}


export default App;
