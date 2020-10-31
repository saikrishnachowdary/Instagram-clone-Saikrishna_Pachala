import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import { auth } from './firebase';
import FileUpload from './FileUpload';


function getModalStyle() {
    const top = 50
    const left = 50

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

const Forms = () => {
    const [modalvisible, Setmodalvisible] = useState(false)
    const [SignINmodalvisible, SetSignINmodalvisible] = useState(false)
    const [username, Setusername] = useState("")
    const [password, Setpassword] = useState("")
    const [email, Setemail] = useState("")
    const [user,Setuser]=useState(null)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const SignUpreq = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName:username
            })
        })
        .catch((error)=>alert(error.message))
    }

    const LoginformSubmitReq = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .catch(error=>alert(error.message))
        SetSignINmodalvisible(false)
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log("USER : ",authUser)
                Setuser(authUser)
            } else {
                Setuser(null)
            }
        })
      
    }, [])
    return (
        <div>
            <div>
                {user ?
                    <>
                    <Button type="button" onClick={() => auth.signOut()}>
                            LogOut
                     </Button>
                    <FileUpload username={user.displayName == null ?"": user.displayName } />
                    </>
                    : 
                    <div>
                        <Button type="button" onClick={() => Setmodalvisible(true)}>
                            Signup
                        </Button> 
                        <Button type="button" onClick={() => SetSignINmodalvisible(true)}>
                            Login
                        </Button>   
                    </div>
                }
               
                <Modal
                    open={modalvisible}
                    onClose={()=>Setmodalvisible(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form>
                            <center>
                                <img className="app__headerImage"
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt="instagramlogo"
                                />
                            </center>
                            <center>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => Setusername(e.target.value)}
                                />
                            </center>
                            <center>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => Setemail(e.target.value)}
                                />
                            </center>
                            <center>
                                <Input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => Setpassword(e.target.value)}
                                /> 
                            </center>
                            <center>
                                <Button type="submit" onClick={(e)=>SignUpreq(e)}>SignUp</Button>
                            </center>
                        </form>
                    </div>
                </Modal>
                <Modal
                    open={SignINmodalvisible}
                    onClose={() => SetSignINmodalvisible(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form>
                            <center>
                                <img className="app__headerImage"
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt="instagramlogo"
                                />
                            </center>
                            <center>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => Setemail(e.target.value)}
                                />
                            </center>
                            <center>
                                <Input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => Setpassword(e.target.value)}
                                />
                            </center>
                            <center>
                                <Button type="submit" onClick={(e) => LoginformSubmitReq(e)}>Sign In</Button>
                            </center>
                        </form>
                    </div>
                </Modal>
            </div> 
        </div>
    )
}

export default Forms
