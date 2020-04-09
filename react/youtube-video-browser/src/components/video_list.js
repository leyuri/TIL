import React from 'react'
import VideoItem from './video_item';
import ListGroup from 'react-bootstrap/ListGroup'


function VideoList({ videos, onItemSelect }) {

    return(


        <ListGroup>
        <ListGroup.Item>

            
        <div className="videoList">
        {
            videos.map(item => (
                
            <VideoItem key={item.id} video={item} onItemSelect={onItemSelect}/>))
        }
        </div>


        </ListGroup.Item>
        </ListGroup>
 
        


    );
}

export default VideoList;