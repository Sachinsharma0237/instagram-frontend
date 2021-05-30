import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {  }
    render() { 
        let {isAuth} = this.props;
        return (  
        <div className="header">
            <Link to="/">
            <div className="logo">
            <img src="logoNew.png" alt="logo.png"/>
            </div>
            </Link>
            { isAuth ? <React.Fragment>
            <div className="search-box">
            <input type="text" placeholder="🔎 Search" name="" id=""/>
            </div>
            <div className="nav-links">
                <ul>
                    <li>
                         <Link to="/">Home</Link>
                    </li>
                    <li>
                         <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={this.props.logout}>Logout</Link>
                    </li>
                </ul>
            </div>
            </React.Fragment>
            : (
                <div className="nav-links">
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
            )}
        </div>);
    }
}
 
export default Header;