import './global.css';
import { Switch, Route, Redirect } from 'react-router-dom'
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
      const registerCall = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
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
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
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
  

  doAddWorkout = workout => {
    this.setState({
      workout: [...this.state.workout, workout]
    })
  }

  getWorkouts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.state.currentUser.id}`, {
        credentials: 'include'
      })
      const responseParsed = await response.json()
      this.setState({ workout: responseParsed })
    } catch (err) {
      console.log(err)
    }
  }

  deleteWorkout = async (id) => { 
    console.log('clicked')
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application"
      }
    });
    this.setState({
      workout: this.state.workout.filter(w => w.id !== id)
    })
  };

  doLogout = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`)
    localStorage.clear()
    this.setState({
      currentUser: null,
      logged: false
    })
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
                    render     = { () => 
                    <Workouts 
                      exercise={workout} 
                      deleteWorkout={this.deleteWorkout} 
                      currentUser={currentUser} 
                      doLogout={this.doLogout}
                      doAddWorkout={this.doAddWorkout}
                    /> }
                  />
                : <Redirect to = {'/'}/>
              }
            </Switch>
    )
  }
}

export default withRouter(App)