import './LoginEntry.css'
import Card from '@material-ui/core/Card';
import {Button, Input,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {googleProvider} from "./service/AuthMethods.js";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const LoginEntry = (props) => {
    // const onclickOfBTN= () => {
    //     props.signUp;
    //     props.uploadProfileImage;
    // }
 
    return (
        <div className="flex__container">
            <div className="flex__item">
            <Card 
            className = "LoginEntry__card"
            variant="outlined"
            >
                <div className="LoginEntry__card__content">
                    <img className ="LoginEntry__logo"src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
                    <TextField size="small" onChange={(event)=>props.username(event.target.value)}className="LoginEntry__username" id="outlined-basic" label="Username" placeholder="Enter Username"variant="outlined" />
                    <TextField onChange={(event)=>props.password(event.target.value)}size="small"className="LoginEntry__password" id="outlined-basic" label="Password" placeholder="Enter Password"type="password" variant="outlined" />
                    <TextField onChange={(event)=>props.email(event.target.value)}size="small"className="LoginEntry__password" id="outlined-basic" label="Email" placeholder="Enter Email Address" variant="outlined" />
                    <Button onClick={props.signUp}variant="contained" style={{backgroundColor: '#0095F6'}} className="LoginEntry__SubmitBtn"><span style={{color: "white"}}><strong>Sign Up</strong></span></Button>
                    <div className="LoginEntry__HRS">       
                             <hr className="LoginEntry__hr1"/>
                             <p className="LoginEntryMIDor">OR</p>
                            <hr className="LoginEntry__hr2"/>
                    </div>
                    <div>
                        <Button onClick={props.loginOnSignInModal}variant="contained" style={{backgroundColor: '#0095F6'}} className="LoginEntry__SignInBtn__Mob"><span style={{color: "white"}}><strong>Sign In</strong></span></Button>
                    </div>
                </div>
            </Card>
            <Card 
                className = "LT__card"
                variant="outlined">
                <div className="LT__cardContent">
                    <p>Have an account?<Button onClick={props.loginOnSignInModal}className="LT__card__LoginLink"><strong>Log In</strong></Button></p>
                </div>
            </Card>
        </div>
        </div>
    )
}

export default LoginEntry
