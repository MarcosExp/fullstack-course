const Header = ({course}) => {
    return <h1>{course.name}</h1>
  }

const Part = ({part}) => {
return (
    <p>
        {part.name} {part.exercises}
    </p>
    )
}

const Total = ({parts})  => {

  const exercisesArray = (parts.map(part=> part.exercises))
  const total = exercisesArray.reduce((s,p) => s+p)

  return (
    <div>
      <p><strong>Total of exercises {total}</strong></p>
    </div>
  )
}

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }

const Course = ({course}) => {
    return (
        <div>
          <Header course={course} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )

}

export default Course