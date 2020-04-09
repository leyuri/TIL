import React from 'react'
import VideoList from './video_list';
import Image from 'react-bootstrap/Image'


export default function VideoDetail({video}) {
    if (!video) {
        return (<div className="text-center">No video</div>)
    }

    return (

        <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" 
        title="video"
        src={`https://www.youtube.com/embed/${video.id}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />
         </div>
      
    );
}

