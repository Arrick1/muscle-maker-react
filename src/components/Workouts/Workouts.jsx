import React           from 'react'
import { Link }        from 'react-router-dom'
import EditModal       from './EditModal'
import AddWorkoutModal from './AddWorkoutModal'
import MappedExercise  from './MappedExercise'
import styled          from 'styled-components'

/* <----------- styled components -----------> */
const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  color: white;
`
const Header = styled.div`
  width: 100vw;
  height: 30vh;
  background-image: url('https://i.imgur.com/gzmUTcw.jpg?1');
  background-size: cover;
  background-position: center;
  button {
    font-family: Roboto;
    font-size: 4em;
    padding: 11px;
    width: 8em;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  a {
    position: absolute;
    top: 1%;
    left: 1%;
    color: white;
  }
  div {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Category = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: 'Montserrat', sans-serif;
  font-size: 2em;
  padding-bottom: .5em;
  padding-top: .5em;
`
const UnorderedList = styled.ul`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: space-around;
  background-color: white;
  color: black;
  font-size: 2em;
  list-style: none;
  padding-top: .5em;
  padding-bottom: .5em;
  font-weight: 400;
`
/* <-----------------------------------------> */

class Workouts extends React.Component {
  state = {
    addWorkoutModal: false,
    editModal: false,
  }
  showAddWorkoutModal = () => {
    this.setState({ addWorkoutModal: true })
  }
  hideAddWorkoutModal = () => {
    this.setState({ addWorkoutModal: false })
  }
  showEditModal = () => {
    this.setState({ editModal: true })
  }
  hideEditModal = () => {
    this.setState({ editModal: false })
  }

  render() {
    return (
      <Container>
        {/* Toggle button for modal. */}
        {/* <button type="button" onClick={this.showEditModal}>Edit</button> */}
        <Header>
          <div>
            <h1>Hi {this.props.currentUser.username}</h1><br/>
            <Link to="/dashboard"><h3>Go back</h3></Link>
            <button type="button" onClick={this.showAddWorkoutModal}>Add a workout＋</button>
          </div>
        </Header>

                {/* COMPONENT */}
                {/* <EditModal /> */}
                <br />
                {/* COMPONENT */}
                {/* <AddWorkoutModal /> */}


        <Category>
          <h4>workout</h4>
          <h4>muscle</h4>
          <h4>equipment | weight</h4>
          <h4>sets | reps</h4>
        </Category>
        <UnorderedList>
          {/* {this.state.Workouts.map((w, i) =>)} */}

        <MappedExercise workout={this.props.exercise} />

        </UnorderedList>




        {/* Ternary to show/hide Modal */}
        {
          this.state.addWorkoutModal
          ? <AddWorkoutModal
              hideAddWorkoutModal={this.hideAddWorkoutModal}
              currentUser={this.props.currentUser}
            />
          : <div />
        }

        {/* Ternary to show/hide Modal */}
        {
          this.state.editModal
          ? <EditModal
              hideEditModal={this.hideEditModal}
            />
          : <div />
        }

      </Container>
    )
  }
}
export default Workouts