import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    state = {  }
    render() { 
        return ( <div className="login">
            <img src="photo7.jpg" alt=""/>
            <button className="btn btn-warning" onClick={this.props.login}><strong>Login with Google+</strong></button>
        </div> );
    }
}
 
export default Login;