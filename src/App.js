import './global.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {withRouter} from 'react-router'
import * as routes  from './constants/routes'
import React from 'react';
import Home  from './components/Home/Home'
import Dashboard   from './components/Dashboard/Dashboard'
import Workouts  from './components/Workouts/Workouts'

class App extends React.Component {
  state = {
    currentUser: {},
    logged: false,
    workout: []
  }

  componentDidMount(){
        const user = localStorage.getItem("current")
        const parsedUser= JSON.parse(user)
        if(user) {
          this.setState({ currentUser: parsedUser },
            () => { this.getWorkouts() })
        }
  }

  doSetCurrentUser = (user) => this.setState({ currentUser: user })

  handleRegister = async (info) =>{
    try {
      const registerCall = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        body: JSON.stringify(info),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await registerCall.json()
      console.log(response, 'from the flask server on localhost:8000')
    } catch (err) {
      console.log(err)
    }
  }
  handleLogin = async (info)=>{
    try {
      const loginResponse = await fetch('http://localhost:8000/users/login', {
        method:      'POST',
        credentials: 'include',
        body:         JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedData = await loginResponse.json()
      if(parsedData.message === 'success'){
        localStorage.setItem("current", JSON.stringify(parsedData.user))
        this.setState({
          logged:      true,
          currentUser: parsedData.user,
        },
        () => { this.getWorkouts() })
        return this.props.history.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  getWorkouts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${this.state.currentUser.id}`, {
        credentials: 'include'
      })
      const responseParsed = await response.json()
      this.setState({ workout: responseParsed })
    } catch (err) {
      console.log(err)
    }
  }

  doLogout = async () => {
    await fetch('http://localhost:8000/users/logout')
    localStorage.clear()
    this.setState({
      currentUser: null,
      logged: false
    })
    // this.props.history.push(routes.LOGIN)
  }

  render() {
    const { currentUser, workout } = this.state
    return (
            <Switch>
              <Route
                exact path = { routes.ROOT }
                render     = { () => <Home handleLogin={this.handleLogin} handleRegister={this.handleRegister}/> }
              />
              { currentUser
              ?
                <Route
                  exact path = { routes.DASHBOARD }
                  render     = { () => <Dashboard currentUser={currentUser} doLogout={this.doLogout}/> }
                />
              : <Redirect to = {'/'}/>
              }
              { currentUser
                ?
                  <Route
                    exact path = { routes.WORKOUTS }
                    render     = { () => <Workouts exercise={workout} currentUser={currentUser} doLogout={this.doLogout} /> }
                  />
                : <Redirect to = {'/'}/>
              }
            </Switch>
    )
  }
}

export default withRouter(App)