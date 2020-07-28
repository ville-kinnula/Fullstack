import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course}  />
      </div>
    )
  }
  
const Header = (props) => {
    return (
      <div>
        <h1> {props.course.name} </h1>
      </div>
    )
  }
  
const Content = (props) => {
    return (
      <div>
        <ul>
          {props.course.parts.map(part => <li key={part.id}><Part part={part} /></li>)}
        </ul>
      </div>
    )
  }
  
const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
const Total = (props) => {
    let total = props.course.parts.reduce( (s, p) => s + p.exercises, 0 )
    return (
      <div>
        <p>
          Number of exercises {total}
        </p>
      </div>
    )
  }

export default Course