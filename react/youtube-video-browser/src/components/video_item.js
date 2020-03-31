import React from 'react';

function VideoItem({video}) {

    // const video = {

    // id: "J5WLNpDt2uU",
    // link: "https://www.youtube.com/watch?v=J5WLNpDt2uU",
    // kind: "youtube#video",
    // publishedAt: "2020-03-31T02:53:00.000Z",
    // channelId: "UCJ0uqCI0Vqr2Rrt1HseGirg",
    // channelTitle: "The Late Late Show with James Corden",
    // title: "BTS Performs &#39;Boy with Luv&#39; In Quarantine - #HomeFest",
    // description: "James Corden connects with super group BTS who perform their hit song `Boy with Luv` while in quarantine in South Korea. More Late Late Show: Subscribe: ...",
    // thumbnails:{ 
    //     default: {url: "https://i.ytimg.com/vi/J5WLNpDt2uU/default.jpg", width: 120, height: 90},
    //     medium: {url: "https://i.ytimg.com/vi/J5WLNpDt2uU/mqdefault.jpg", width: 320, height: 180},
    //     high: {url: "https://i.ytimg.com/vi/J5WLNpDt2uU/hqdefault.jpg", width: 480, height: 360}
    //     }
    // }
    return(
        <div className="video-item mb-1">
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