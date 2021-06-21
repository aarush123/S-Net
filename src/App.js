import './App.css';
import Post from './Post';
import './Post.css';
import firebase from 'firebase';
import React, { useEffect, useState } from "react";
import {db, auth} from './Firebase';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';
import LoginEntry from './LoginEntry';
import SignInEntry from './signInEntry';

function App() {
  const [posts, setPosts ] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null);
  const [userSignIn, setUserSignIn] = useState(false);
  const [signInOnSignUp, setSignInOnSignUp] = useState(false);
  
  
// for user authentication, this below useEffect is being used
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // when the user has logged in 
        // console.log(authUser);
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
  // const dpChange = (e) =>{
  //   if(e.target.files[0]){
  //     setImage(e.target.files[0]);
  //     console.log('set image, it should be working,')
  //   }
  // }
  // the below is the signup function
  const signup = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((authUser) =>{
      authUser.user.updateProfile({
        displayName: username
      });
      // firebase.storage().ref('users/' + authUser.user.uid + '/profile.jpg').put(image).then(()=>{
      //   firebase.storage().ref('users/' + authUser.user.uid + '/profile.jpg').getDownloadURL().then(url=>{
      //     // // {<ImageUpload avatarLink={authUser.url}/>}
      //     // authUser.user.url({
      //     //   profileURL: url
      //     // })
      //     console.log(url)
      //     console.log('succcessfully uploaded profile Image')
      //   }).catch(err=>{console.log(err.message)});
      // })
      // .catch(err=>{
      //   console.log(err.message);
      // });
    })
    .catch((error) => alert(error.message))
  }

  // sign in function 
  
  
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch(err => {alert(err.message)})
    setUserSignIn(false)
    }
    const testfunc =  (e) =>  {
      e.preventDefault();
      setSignInOnSignUp(true);
    }
    const signuponsignIn = (e) => {
      e.preventDefault();
      setSignInOnSignUp(false);
    }
  return (

    <div className="App">
      <header className="App-header">

        {/* Main header */}
          {user ? (
                <div className = "app__headerImage">
                  <img src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
                    <div className="App__avLog App__headerImage__uploadButton">
                        {user.displayName!=="" ? (<ImageUpload header={user.displayName}/>) : (<h3>NOT SIGNED IN</h3>)}
                    </div>
                </div>
                  )
                  :
                  (
                  <div>
                    {signInOnSignUp ? (
                      <SignInEntry
                        email={(value)=>{setEmail(value)}}
                        password={(value)=>{setPassword(value)}}
                        signIn={signIn}
                        signupOnSignIn={signuponsignIn}
                      />
                    ) 
                    :
                    (
                        <LoginEntry 
                        username={(value)=>{setUsername(value)}}
                        email={(value)=>{setEmail(value)}}
                        password={(value)=>{setPassword(value)}}
                        signUp={signup}
                        loginOnSignInModal={testfunc}
                        />
                  )}
                  </div>
                  )
                  }
         </header>
                  {user? (
                  <div>
                      {
                      posts.map(({id, post})=>(
                      <Post key={id} signInUser={user} postId={id} header={post.header} caption={post.caption} imageURL ={post.imageURL}/>
                      ))
                      }
                      </div>
                      ):
                  (
                    null
                  )}  
    </div>
  )}

export default App;
