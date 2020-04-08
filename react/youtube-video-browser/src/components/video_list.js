import React from 'react'
import VideoItem from './video_item';


function VideoList({ videos, onItemSelect }) {

    return(

        <div className="videoList">
        {
            videos.map(item => (
            <VideoItem key={item.id} video={item} onItemSelect={onItemSelect}/>))
        }
        </div>
    );
}

export default VideoList;