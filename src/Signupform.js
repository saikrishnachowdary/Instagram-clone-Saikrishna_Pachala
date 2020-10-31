import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import { auth } from './firebase';


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

const Signupform = () => {
    const [modalvisible, Setmodalvisible] = useState(false)
    const [username, Setusername] = useState("")
    const [password, Setpassword] = useState("")
    const [email, Setemail] = useState("")
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const FormSubmit = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .catch((error)=>alert(error.message))
    }
    return (
        <div>
            <div>
                <Button type="button" onClick={() =>Setmodalvisible(true)}>
                    Open Modal
                 </Button>
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
                                <Button type="submit" onClick={(e)=>FormSubmit(e)}>SignUp</Button>
                            </center>
                        </form>
                    </div>
                </Modal>
            </div> 
        </div>
    )
}

export default Signupform
