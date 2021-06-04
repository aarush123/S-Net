import React from 'react'
import {Button, Input} from '@material-ui/core';
import {useState} from 'react';
import firebase from 'firebase';
import {db, auth,storage} from './Firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";

import './App.css';

function getModalStyle () {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
const ImageUpload = ({header}) => {
    // below are the useStates, so they will be created whenever something needs to be changed dynamically.
    const [image, setImage] = useState(null);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [uploadPost, setUploadPost] = useState(false)

    // below are the functions that I am using which are declared in the return method
    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    };
    const handleUpload = (e) =>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed", 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100); 
                setProgress(progress);
            }, (error) => {
                alert(error.message)
            }, () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    // here I am posting the image to the database
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageURL: url,
                        header: header
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null)
                })
                setUploadPost(false);
            }
        )
    }
  
    return (
     <div>
        <div>
            <Modal
                open = {uploadPost}
                onClose = {()=>setUploadPost(false)}>
                <div style= {modalStyle} className={classes.paper}>
                    <center>
                    <img className = "app__headerImage" src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
                    <form className = "app__signupModal">

                        {/* The below are the actua+l fields whicch are being rendered on the frontend and these contain a function */}
                        <progress className="ImageUpload__uploadPost__progress" value={progress} max="100"/>
                        <Input type="file" onChange={handleChange}/>
                        <Input type="text"onChange = {event => setCaption(event.target.value)} placeholder= "Enter a caption..." />
                        <Button type="submit"onClick={handleUpload}>Upload!</Button>
                    </form>
                    </center>
                </div>
            </Modal>
        </div>
        <div className="App__avLog App__headerImage__uploadButton">
            <Button variant="outlined" className="App__signInButton" onClick={()=>setUploadPost(true)}>Upload</Button>
            <Button variant="outlined" className="App__signInButton" onClick = {() => auth.signOut()}>Logout</Button>
            <Avatar alt={header} src="s"className="App__avatarLetter"/>
        </div>

    </div>
    )
}
export default ImageUpload;
