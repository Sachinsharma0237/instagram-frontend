import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Settings from './Components//Settings/Settings';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';


class App extends Component {
  state = {
    user : null,
    isAuth : false
  }

  login=()=>{
    window.location = "http://localhost:4000/auth/google";
  }

  logout=()=>{
    axios.get("auth/destroyCookie").then( obj=>{
      console.log(obj);
    })
    this.setState({
      isAuth : false
    })
  }

  updateUser=(updateUser)=>{
    this.setState({
      user : updateUser
    })
  }

  componentDidMount(){
    axios.get("/auth/checkAuth").then( obj=>{
        if(obj.data.isAuth){
          this.setState({
            isAuth: true,
            user: obj.data.user
          })
        }
    })
  }


  render() {
    return (
      <Router>
        <div className="app">
        <Header isAuth={this.state.isAuth} logout = {this.logout} />
        <Switch>
          <Route path="/" exact>
            {this.state.isAuth ? <Home user={this.state.user} /> : <Login login={this.login}></Login>}
          </Route>

          <Route path="/profile" exact>
          {this.state.isAuth ? <Profile user={this.state.user} /> : <Login login={this.login}></Login>}
          </Route>

          <Route path="/settings" exact>
          {this.state.isAuth ? <Settings user={this.state.user} updateUser={this.updateUser} /> : <Login login={this.login}></Login>}
          </Route>

          <Route path="*" exact>
            <Redirect to="/"></Redirect>
          </Route>

        </Switch>
      </div>
      </Router>);   
  }
}

export default App;