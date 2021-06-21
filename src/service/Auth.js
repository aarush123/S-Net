import firebase from './AuthMethods'
const socialMediaAuth = (provider) =>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((res) => {
        return res.user;
    })
    .catch((error)=>{
        console.log(error)
    })
}

export default socialMediaAuth;