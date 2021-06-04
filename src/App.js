import './App.css';
import Post from './Post';
import './Post.css';
import firebase from 'firebase';
import React, { useEffect, useState } from "react";
import {db, auth} from './Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';


function getModalStyle () {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: 'none',
  },
}));
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts ] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null);
  const [userSignIn, setUserSignIn] = useState(false);
  const [image, setImage] = useState(false);

// for user authentication, this below useEffect is being used
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // when the user has logged in 
        console.log(authUser);
        setUser(authUser);
      }
      else{
        // when the user logs out
        setUser(null);
      }
    })
    return () => {
      // this code is performing the clean up action, so whenever the new username is changed then the entire useEffect will not be fired up(the above one console and everything )
      unsubscribe();
    }
  }, [user, username]);
  // useeffect is a hook which runs a piece of code  on a specific condition, this is for the post creation
  useEffect(()=>{
    // this is where the code runs 
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // the snapshot listerner is provided by firebase and when any change will happen in the database, this will be fired up and run the code
      // setPosts(snapshot.docs.map(doc=>doc.data()));
      setPosts(snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          post: doc.data()
        }
      }))
    })
  }, []);
  // the below function is for uploading the profile Image
  const dpChange = (e) =>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  // the below is the signup function
  const signup = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((authUser) =>{
      authUser.user.updateProfile({
        displayName: username
      })
      firebase.storage().ref('users/' + authUser.user.uid + '/profile.jpg').put(image).then(()=>{
        firebase.storage().ref('users/' + authUser.user.uid + '/profile.jpg').getDownloadURL().then(url=>{
          // // {<ImageUpload avatarLink={authUser.url}/>}
          // authUser.user.url({
          //   profileURL: url
          // })
          console.log(url)

        });
        console.log('succcessfully uploaded profile Image')
      })
      .catch(err=>{
        console.log(err.message);
      });
    })
    .catch((error) => alert(error.message))
    setOpen(false)
    // const uploadTask = storage.ref(`profile_images/${image.name}`).put(image);
    // uploadTask.on(
    //   "state_changed",
    //     (snapshot) => {},
    //     (error) =>{
    //       console.log(error.message)
    //     },
    //     () => {
    //       storage
    //       .ref("profile_images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then(url =>{
    //         db.collection('profileImages').add(
    //           {profileImage: url}
    //         )
    //         console.log(url)
    //       })
    //     }
    // )

  }
  // sign in function 
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch(err => {alert(err.message)})
    setUserSignIn(false)
  }

  return (
    <div className="App">
        
      <header className="App-header">
        {/* Main header */}
        <div className = "app__headerImage">
          <img src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
          {user ? (
          <div className="App__avLog App__headerImage__uploadButton">
            {user.displayName!=="" ? (<ImageUpload header={user.displayName}/>) : (<h3>NOT SIGNED IN</h3>)}
              {/* <Button variant="outlined" className="App__signInButton" onClick = {() => auth.signOut()}>Logout</Button>
              <Avatar className="App__avatarLetter" /> */}
          </div>
          ):
          (<div className="app__loginContainer App__headerImage__uploadButton">
                    {/* this is used when the user is signed in */}
                      <Button variant="outlined" className="App__signInButton" onClick={()=> setUserSignIn(true)}>Sign In</Button>
                      <Button variant="outlined" className="App__signUpButton" onClick={()=> setOpen(true)}>Sign Up</Button>
            </div>)
            }
        </div>
      </header>
{/*the below modal is for the sign up button  */}
<Modal
        open = {open}
        onClose = {() => setOpen(false)}
      >
        <div style= {modalStyle}  className={classes.paper}>
          <center>
            <img className = "app__headerImage" src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
            <form className = "app__signupModal">
            <Input placeholder="Username" type="text" value={username} 
            onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input placeholder="Email Address" type="text" value={email} 
            onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder="Password" type="password" value={password} 
            onChange={(e)=>{setPassword(e.target.value)}}/>
            <Input id="profileImage" onChange={dpChange}type="file"/>
            <label for="profileImage" >Upload Profile Image</label>
            <Button type="submit"onClick={signup}> Sign Up</Button>
          </form>
          </center>
        </div>
      </Modal>
      {/* thhe below is the modal for the sign in button  */}
      <Modal
        open = {userSignIn}
        onClose = {()=> setUserSignIn(false)}
      >
        <div style= {modalStyle}  className={classes.paper}>
          <center>
          <img className = "app__headerImage" src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
            <form className = "app__signupModal">
              <Input placeholder="Enter Email" type="text" value={email} 
              onChange={(e)=>{setEmail(e.target.value)}}/>
              <Input placeholder="Password" type="password" value={password} 
              onChange={(e)=>{setPassword(e.target.value)}}/>
              <Button onClick={signIn} type="submit">Sign In</Button>
            </form>
          </center>
        </div>
      </Modal>
      
      <div>
      {
      posts.map(({id, post})=>(
      <Post key={id} signInUser={user} postId={id} header={post.header} caption={post.caption} imageURL ={post.imageURL}/>
      ))
      }
      </div>

    </div>
  );
}

export default App;
