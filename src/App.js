import React,{useEffect,useState} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import Signupform from './Signupform'

function App() {
  const [posts, SetPosts] = useState([])
  console.log("postsfromFB",posts)
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      SetPosts(snapshot.docs.map(doc => ({
        id:doc.id,
        post: doc.data()
      })));
   })
  }, [])
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagramlogo"
        />
      </div>
      <div>
        <Signupform/>
        {posts && posts.map(({id,post})=>
          <Post username={post.username} caption={post.caption} imgUrl={post.imgUrl} key={id} />
        )}
      </div>
    </div>
  );
}

export default App;
