
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const calculateTotal = (parts)=> parts.reduce(
  (acc,curr) => curr.exercises + acc
,0)

const Total = ({ course }) => (
  <p>Number of exercises {calculateTotal(course.parts) }</p>
) 


const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>    
)


const Content = ({ course }) => (
  <div>
    {course.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Course =({course})=>(
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)
const Courses = ({courses}) => (
  <div>
    {courses.map(course => <Course key={course.id} course={course}/>)}
  </div>
)

export default Courses