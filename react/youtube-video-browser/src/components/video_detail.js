import React from 'react'
import VideoList from './video_list';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default function VideoDetail({video}) {
    if (!video) {
        return (<div className="text-center">No video</div>)
    }

    return (

    <div>
        <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" 
        title="video"
        src={`https://www.youtube.com/embed/${video.id}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />


        </div>
        <div>
        <Card>
        <Card.Body>
            <Card.Title>{video.title}</Card.Title>
            <Row>
                <Col className="mb-2 text-muted" sm={9}>
                채널명: {video.channelId}
                </Col>
                <Col sm={3}>
                <Button variant="danger">구독하기
                <svg class="bi bi-check-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"/>
                </svg>
                </Button> 
                </Col>
            </Row>
            <br></br>
            <Card.Text >
            {video.description}
            </Card.Text>
        </Card.Body>
        </Card>
        </div>
    </div>
        
      
    );
}

