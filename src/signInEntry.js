import React from 'react'
import './signInEntry.css'
import Card from '@material-ui/core/Card';
import {Button,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     button: {
//       margin: theme.spacing(1),
//     },
//   }));

const SignInEntry = (props) => {

    return (
        <div className="flex__container">
            <div className="flex__item">
            <Card 
            className = "LoginEntry__card"
            variant="outlined"
            >
                <div className="LoginEntry__card__content">
                    <img className ="LoginEntry__logo"src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
                    <TextField onChange={(event)=>props.email(event.target.value)} size="small"className="LoginEntry__username" id="outlined-basic" label="Email"variant="outlined" />
                    <TextField onChange={(event)=>props.password(event.target.value)}size="small"className="LoginEntry__password" id="outlined-basic" label="Password" type="password" variant="outlined" />
                    <Button onClick={props.signIn}variant="contained" style={{backgroundColor: '#0095F6'}} className="LoginEntry__SubmitBtn"><span style={{color: "white"}}><strong>Sign In</strong></span></Button>
                    <div className="LoginEntry__HRS">       
                             <hr className="LoginEntry__hr1"/>
                             <p className="LoginEntryMIDor">OR</p>
                            <hr className="LoginEntry__hr2"/>
                    </div>
                    <div>
                        <Button onClick={props.signupOnSignIn}variant="contained" style={{backgroundColor: '#0095F6'}} className="LoginEntry__SignInBtn__Mob"><span style={{color: "white"}}><strong>Sign Up!</strong></span></Button>
                    </div>
                </div>
            </Card>
            <Card 
               className = "LT__card"
               variant="outlined"
            >
                <div className="LT__cardContent">
                    <p>Don't have an account? <Button onClick={props.signupOnSignIn} className="LT__card__LoginLink"><strong>Sign Up</strong></Button> </p>
                </div>
            </Card>
        </div>
        </div>
    )
}

export default SignInEntry
