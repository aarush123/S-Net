import React from 'react';
import {useEffect, useState} from 'react';
import {db} from './Firebase';
import Avatar from "@material-ui/core/Avatar";
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments,faHeart,faCloudDownloadAlt, faShare } from '@fortawesome/free-solid-svg-icons'
import {Button, Input} from '@material-ui/core';

function Post({caption, imageURL, header,postId,signInUser}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    const postComment = (event) => {        
            event.preventDefault()
            db.collection("posts").doc(postId).collection("comments").add({
            caption: comment,
            header: signInUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map(doc =>doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);
        return (
        <div className="Post">
            <div className = "post__header">
                {/* header = (avatar + username) */}
                <Avatar alt={header} src="F"/><h3 className = "post__heading">{header}</h3>
            </div>
            {/* image */}
            <img className = "post__image"src={imageURL} alt={imageURL}/>
            <div className="post__likeSection">
                <FontAwesomeIcon className="post__likeIcon"icon={faHeart} size="lg"/>
                <FontAwesomeIcon className="post__commentIcon"icon={faComments} size="lg"/>
                <FontAwesomeIcon className="post__shareIcon"icon={faShare} size="lg"/>
                <FontAwesomeIcon className="post__saveIcon" icon={faCloudDownloadAlt} size="lg"/>
            </div>
            {/* username + captiom */}
            <h4 className="post__username"><strong>{header}</strong> {caption}</h4>
            <div className="Post__Comments">
            {comments.map((comment)=>(
                    <p>
                        <b>{comment.header}</b> {comment.caption}
                    </p>
            ))}
            {/* here the comment will come */}
            {signInUser?(
            <form className="Post__commentInput">
            <Input value={comment} onChange={(e)=>setComment(e.target.value)} className="post__comment"placeholder="Add a Comment"/>
            <Button 
                disabled={!comment}
                className="post__commentButton"
                type="submit"
                onClick={postComment}
            > 
                Post
            </Button>
            </form>):
            (console.log('User Not Signed in!'))}
            </div>
        </div>
    )
}

export default Post
