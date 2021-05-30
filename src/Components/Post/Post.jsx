import axios from 'axios';
import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
    state = { 
        userPhoto : "",
        username : "",
        caption : "",
        postImage : "",
        comment: [],
        likes : []
     };
    componentDidMount(){
        if( this.props.user ){
            this.setState({
                username : this.props.user.username,
                caption: this.props.post.caption,
                userPhoto: this.props.user.profilePic,
                postImage: this.props.post.postImage,
                comments: this.props.post.comments,
                likes: this.props.post.likes
            })
        }else{
            let post = this.props.post;
            let postUser = this.props.post.uid
            axios.get(`/api/user/${postUser}`).then( obj =>{
                let postUser = obj.data.user;
                this.setState({
                    userPhoto: postUser.profilePic,
                    username: postUser.username,
                    caption: post.caption,
                    postImage: post.postImage,
                    comment: post.comments,
                    likes: post.likes
                })
            })

        }
    }

    render() { 
        let { username, userPhoto, caption, postImage, comments, likes } = this.state;
        return ( <ul className="post">
                <div className="post-header">
                    <div className="post-userphoto">
                        <img src={userPhoto} alt="user.png"/>
                    </div>
                    <div><strong className="post-username">{username}</strong></div>
                </div>
                <ul className="post-body">
                    <div className="post-image">
                        <img src={postImage} alt="user.png"/>
                    </div>
                    <ul className="post-actions">
                        <div className="like-comment">
                            <p className="like">
                            <img src="like.png" alt=""/>
                            </p>
                            <p className="comment">
                            <img src="comment.png" alt=""/>
                            </p>
                        </div>
                        <div className="likes-count">1231 likes</div>
                        <div className="post-details">
                            <div><strong className="post-username">{username}</strong></div>
                            <div className="post-caption">{caption}</div>
                        </div>
                        <div className="post-comments">Comments</div>
                        <div className="post-comment-box">
                            <input type="text" name="" id="input" placeholder="Add a comment…"/>
                            <div className="post-comment-btn">post</div>
                        </div>
                    </ul>
                </ul>
        </ul>);
    }
}
 
export default Post;