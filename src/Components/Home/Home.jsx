import React, { Component } from 'react';
import './Home.css';
import Feeds from '../Feeds/Feeds';
import HomeProfile from '../HomeProfile/HomeProfile';

class Home extends Component {
    state = { 
        user : null
     }

     componentDidMount(){
        this.setState({
            user : this.props.user
        })
     }

    render() { 
        return ( <div className="home">
            {this.state.user ? (
            <React.Fragment>
                <Feeds user={this.state.user}></Feeds>
                <HomeProfile user={this.state.user}></HomeProfile>
            </React.Fragment>
             ) : (
             <h1 className="spinner-border text-warning" id="no-post-tag"></h1>
             )}
        </div> );
    }
}
 
export default Home;