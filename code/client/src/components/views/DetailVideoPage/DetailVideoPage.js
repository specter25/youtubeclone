import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';


function DetailVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentList, setCommentList] = useState([])

    const videoVariable = {
        videoId: videoId
    }
    const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })


        axios.post('/api/comment/getComment', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.comments)
                    setCommentList(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%', maxHeight: '500px' }} src={`http://localhost:5000/uploads/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />, <Subscriber userTo={Video.writer ? Video.writer._id : null} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                        <Comments CommentList={CommentList} postId={Video._id} refreshFunction={updateComment} />

                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row >
        )

    }
    else {
        return <div>loading...</div>
    }

}

export default DetailVideoPage;

//copy the template
//import all the required things
//fetch the video post data from mongodb
//use the useEffect hook to fetch data from mongodb
//make the videoId and videovariable parameter
//now mak ethe route
//put the entire video data received inside a state
//render that state

//now make a new component dor the side Video page



//noe for the Subscribe faeture make another compoent

//make the comment modal now