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