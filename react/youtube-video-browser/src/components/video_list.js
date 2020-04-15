import React from 'react'
import VideoItem from './video_item';
import ListGroup from 'react-bootstrap/ListGroup'


function VideoList({ videos, onItemSelect }) {

    return(

        
        <ListGroup>
        
        다음 동영상
        <br></br><br></br>
        <div className="videoList">
        <ListGroup.Item>
        <div></div>
        {videos.map(item => (

            
        
            <VideoItem key={item.id} 
            video={item} 
            onItemSelect={onItemSelect}/>))
        }
        </ListGroup.Item>
        </div>


    
        </ListGroup>
        



       
 
        


    );
}

export default VideoList;