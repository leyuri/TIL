import React from 'react';

function VideoItem({video, onItemSelect}) {

    return(
        <div className="video-item mb-1" onClick={() => {
            onItemSelect(video);
        }}>
            <div className="row">
                <div className="col pr-1">
                    <img src={video.thumbnails.default.url} alt={video.title}/>
                </div>
                <div className="col pl-0" style={{fontSize: '11px'}}>
                {video.title}
                </div>
            </div>
        </div>
    );

};


export default VideoItem;