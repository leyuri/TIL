import React, { Component } from 'react'
import VideoItem from './video_item';


class VideoList extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(

            <div className="videoList">
            {
                this.props.videos.map(item => (<VideoItem key={item.id} video={item}/>))
            }

            </div>


           
        )
    }

}

export default VideoList;