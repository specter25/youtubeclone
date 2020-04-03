import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment.js'

import ReplyComment from './ReplyComment.js'

const { TextArea } = Input;


const Comments = props => {
    const [Comment, setComment] = useState("")
    const user = useSelector(state => state.user)

    const handleChange = (e) => {

        setComment(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }


    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentList)}
            {props.CommentList && props.CommentList.map((comment, index) => (

                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentList={props.CommentList} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>)
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}


export default Comments


//make the handle chamge
//useState
//make request
//make variables//with Comment , userId using useSeelector and import the video id As prop from parent component
//make the comment route
//also receive a function named updatecomment as a prop and post the updated comment via it
//also make a state in the Detail section about the comment lIst
//also receive the comment List as a Prop
