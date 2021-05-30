import React, { Component } from "react";
import "./Settings.css";
import axios from "axios";

class Settings extends Component {
  state = {
    name: "",
    username: "",
    bio: "",
    email: "",
    password: "",
    profilePic: "",
    disabled: true,
  };
  fileInput = React.createRef();

  onChangeHandler = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    this.setState({
      [type]: value,
    });
  };

  onEditHandler = () => {
    this.setState({
      disabled: false,
    });
  };

  onCancelHandler = () => {
    let { name, username, bio, email, password, profilePic } = this.props.user;
    this.setState({
      name,
      username,
      bio,
      email,
      password,
      profilePic,
      disabled: true
    })
  };

  onUpdateDetailsHandler = () => {
    let fileObject = this.fileInput.current.files[0];
    let formData = new FormData();
    formData.append("photo", fileObject);
    axios.patch(`/api/user/${this.props.user["_id"]}`, formData).then((obj) => {
      console.log(obj);
      let profilePic = obj.data.updatedUser.profilePic;
      this.setState({
        profilePic,
      });
    });
  };

  onSaveHandler=()=>{
      let formData = new FormData();
      let { name, username, bio, email, password } = this.state;
      formData.append( 'name', name );
      formData.append( 'username', username );
      formData.append( 'bio', bio );
      formData.append( 'email', email );
      formData.append( 'password', password );
      axios.patch(`/api/user/${this.props.user["_id"]}`, formData).then( obj=>{
            if(obj.data.updatedUser){
                this.props.updateUser(obj.data.updatedUser);
                this.setState({
                    disabled:true
                })
            }
      })
  };

  componentDidMount() {
    let { name, username, bio, email, password, profilePic } = this.props.user;
    console.log(this.props.user);
    this.setState({
      name,
      username,
      bio,
      email,
      password,
      profilePic,
    });
  };

  render() {
    let { name, username, bio, email, password, disabled } = this.state;
    return (
      <div className="settings">
        <div className="profile-photo">
          <img src={this.state.profilePic} alt="" />
          <input type="file" name="" id="" ref={this.fileInput} />
          <button className="" onClick={this.onUpdateDetailsHandler}>
            Update Profile Pic
          </button>
        </div>
        <ul className="profile-details">
          <div className="profile-details-form">
            {/* name */}
            <div className="detail">
              <h2>Name</h2>
              <input
                type="text"
                id="name"
                value={name}
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.onChangeHandler(e);
                }}
              />
            </div>
            {/* username */}
            <div className="detail">
              <h2>Username</h2>
              <input
                type="text"
                id="username"
                value={username}
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.onChangeHandler(e);
                }}
              />
            </div>
            {/* bio */}
            <div className="detail">
              <h2>Bio</h2>
              <input
                type="text"
                id="bio"
                value={bio}
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.onChangeHandler(e);
                }}
              />
            </div>
            {/* email */}
            <div className="detail">
              <h2>Email</h2>
              <input
                type="text"
                id="email"
                value={email}
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.onChangeHandler(e);
                }}
              />
            </div>
            {/* password */}
            <div className="detail">
              <h2>Password</h2>
              <input
                type="password"
                id="password"
                value={password}
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.onChangeHandler(e);
                }}
              />
            </div>
          </div>
          {disabled ? (
            <div className="profile-actions">
              <button className="edit" onClick={this.onEditHandler}>
                Edit
              </button>
            </div>
          ) : (
            <div className="profile-actions">
              <button className="cancel" onClick={this.onCancelHandler}>
                Cancel
              </button>
              <button className="save" onClick={this.onSaveHandler} >Save</button>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

export default Settings;
