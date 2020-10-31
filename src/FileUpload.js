import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from 'firebase';

const FileUpload = ({ username}) => {
    const [image, Setimage] = useState(null);
    const [progress, Setprogress] = useState(0);
    const [caption, Setcaption] = useState('');
    const FilehandleChange = e => {
        if (e.target.files[0]) {
            Setimage(e.target.files[0])
        } else {
            
        }
    }

    const HandleUpload = e => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed" ,
            (snapshot) => {
                const progress = Math.round(
                    snapshot.bytesTransferred / snapshot.totalBytes * 100
                );
                Setprogress(progress);
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username:username
                    })
                        Setprogress(0);
                        Setcaption("");
                        Setimage(null);
                })
            }
        )
    }
    return (
        <div>
            <progress type="progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter a Caption...." onChange={(e) => Setcaption(e.target.value)}/>
            <input type="file" onChange={FilehandleChange} />
            <Button onClick={HandleUpload}>Upload</Button>
        </div>
    )
}

export default FileUpload
