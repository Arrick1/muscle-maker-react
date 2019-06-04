import React, { Component }  from 'react'
// import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Modal = styled.div`
  position: absolute;
  left: 31%;
  top: 11%;
  font-family: 'Roboto', sans-serif;
  background-color: rgb(0, 0, 0, .96);
  border-top: 5px solid orange;
  height: 85vh;
  width: 36.8em;
  h3 {
    margin-left: .7em;
    color: white;
    font-weight: 300;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 76vh;
    p {
      color: white;
      cursor: pointer;
      text-decoration: underline;
      text-align: center;
    }
    button {
      position: relative;
      background-color: orange;
      border: 4px solid orange;
      color: white;
      &:hover {
        background-color: rgb(0,0,0, .0);
        border: 4px solid orange;
        color: orange;
        cursor: pointer;
      }
    }
    .cancel-button {
      margin-left: 20px;
      background-color: rgb(0,0,0, .0);
      color: orange;
      &:hover {
        border: 4px solid orange;
        color: white;
        background-color: orange
      }
    }
    .button {
      font-size: 2em;
      height: 2.5em;
      width: 5em;
      margin-bottom: .5em;
    }
  input {
    width: 70%;
    padding-top: 5%;
    display: block;
    background: 0;
    border: 0;
    border-bottom: 2px solid white;
    color: #fff;
    font-weight: 600;
    font-size: 2em;
    padding-bottom: 8px;
    outline: 0;
    text-align: center;
    }
  }
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 3em;
  top: 3%;
  margin-top: .5em;
`
/* <------- end of styled components --------> */

class RegisterModal extends Component {
  state ={
    username:'',
    email:'',
    password:'',
    verify_password:''
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  doRegisterUser = e => {
    e.preventDefault()
    this.props.hideRegisterModal()
    this.props.showLoginModal()
    this.props.handleRegister(this.state)
  }


  closeRegisterModalOnSubmit = e => {
    this.setState({
      registerModal: false
    })
  }

  render() {
    const { username, email, password, verify_password } = this.state
    return (
      <Modal>
        <Header>
          <h3>Register</h3>
        </Header>
        <form onSubmit={e => this.doRegisterUser(e) }>
          <input
            value={username}
            onChange={this.changeHandler}
            type="text"
            name="username"
            placeholder="username"
            autoComplete="off"
            />
          <input
            value={email}
            onChange={this.changeHandler}
            type="text"
            name="email"
            placeholder="email"
            autoComplete="off"
          />
          <input
            value={password}
            onChange={this.changeHandler}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
          />
          <input
            value={verify_password}
            onChange={this.changeHandler}
            type="password"
            name="verify_password"
            placeholder="verify password"
            autoComplete="off"
          />
          <div>
            <button onClick={this.doRegisterUser} className="button">
              Register
            </button>
            <button onClick={this.props.hideRegisterModal} className="cancel-button button">
              Cancel
            </button>
            <p onClick={this.props.showLoginModal}>
              Already have an account?
            </p>
          </div>
        </form>
      </Modal>
    )
  }
}

export default RegisterModal