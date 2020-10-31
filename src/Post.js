import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

const Post = ({ username, caption, imgUrl}) => {
    return (
        <div className='Post'>
            <div className='Post__Header'>
                <Avatar
                    className='Post__Avatar'
                    alt='Saikrishna'
                    src={imgUrl}
                />
                <h3 className='Post__Username'> {username}</h3>
            </div>
            <img className='Post__Image' src={imgUrl} />
            <h4 className='Post__Description'><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
