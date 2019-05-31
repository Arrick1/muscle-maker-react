import React, { Component } from 'react'

class MappedExercise extends Component {
    render(){
        return this.props.workout.map((exercise, i) => {
            return(
                <ul key={i}> 
                    <li>{exercise.muscle}</li>
                    <li>{exercise.workout_name}</li>
                    <li>{exercise.equipment}</li>
                    <li>{exercise.weight}</li>
                    <li>{exercise.sets}</li>
                    <li>{exercise.reps}</li>
                </ul>
        )
    })
}
}



export default MappedExercise