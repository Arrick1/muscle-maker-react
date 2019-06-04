import React, { Component } from 'react'
import styled from 'styled-components'

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

class MappedExercise extends Component {
    render(){
        return this.props.workout.map((exercise, i) => {
            return(
                <UnorderedList key={i}>
                    {/* Edit Button COMPONENT */}
                    {/* <button type="button" onClick={this.showEditModal}>Edit</button> */}
                    <li>{exercise.muscle}</li>
                    <li>{exercise.workout_name}</li>
                    <li>{exercise.equipment} | {exercise.weight}lbs</li>
                    <li>{exercise.sets} sets | {exercise.reps} reps</li>
                    <button onClick={() => this.props.deleteWorkout(exercise.id)}>Delete</button>
                </UnorderedList>
        )
    })
}
}



export default MappedExercise