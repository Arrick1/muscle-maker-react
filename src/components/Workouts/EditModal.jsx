import React from 'react'
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Modal = styled.div`
  position: absolute;
  left: 66%;
  top: 11%;
  font-family: 'Roboto',sans-serif;
  background-color: rgb(20, 20, 20, .99);
  border-top: 5px solid orangered;
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
    height: 85vh;
    div {
      margin-top: 2em;
    }
    button {
      position: relative;
      width: 8em;
      top: -10%;
      font-size: 2em;
      background-color: orangered;
      border: 4px solid orangered;
      color: white;
      margin-top: .5em;
      margin-bottom: .5em;
      border-radius: 15px;
      padding: 2px;
      padding-left: 1em;
      padding-right: 1em;
      &:hover {
        background-color: rgb(0, 0, 0, 0);
        border: 4px solid rgb(0, 0, 0, 0);
        color: orangered;
        cursor: pointer;
      }
    }
    .cancel-button {
      top: -2%;
      margin-left: 20px;
      padding: 18px;
      font-size: 2em;
      width: 6em;
      background-color: rgb(0,0,0, .0);
      position: relative;
      top: 4%;
      &:hover {
        border: 4px solid hotpink;
        color: hotpink;
      }
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
/* <------- end of styled components --------> */

class EditModal extends React.Component {
  state = {
    muscle: '',
    workout_name: '',
    equipment: '',
    weight: '',
    sets: '',
    reps: '',
    created_by: null
  }
  componentDidMount(){
    this.setState({ created_by: this.props.currentUser.id })
  }
  handleInput = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }
  handleSubmit = async(e, id) =>{
    e.preventDefault()
    const editWorkout = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/workouts/${id}`,{
      method: 'PUT',
      body: JSON.stringify(this.state),
      credentials: 'include',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
  }
  render() {
    return (
      <Modal>
        <form onSubmit={this.handleSubmit}>
          <input
            autoComplete="off"
            placeholder="workout"
            name="muscle"
            onChange={this.handleInput}
          />
          <input
            autoComplete="off"
            placeholder="muscle"
            name='workout_name'
            onChange={this.handleInput}
          />
          <input
            autoComplete="off"
            placeholder="equipment"
            name='equipment'
            onChange={this.handleInput}
          />
          <input
            autoComplete="off"
            placeholder="weight"
            name='weight'
            onChange={this.handleInput}
          />
          <input
            autoComplete="off"
            placeholder="Sets"
            name='sets'
            onChange={this.handleInput}
          />
          <input
            autoComplete="off"
            placeholder="Reps"
            name='reps'
            onChange={this.handleInput}
          />
          <div>
            <button>
              Confirm<br/>changes
            </button>
            <button onClick={this.props.hideEditModal} className="cancel-button">
              Cancel
            </button>
          </div>
      </form>
    </Modal>
    )
  }
}

export default EditModal