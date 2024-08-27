
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((total, part) => total + part.exercises, 0)
  return <p><strong>total of {sum} exercises </strong></p>
}


const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
)

const Course = ({ courses }) => (
    <div>
      <h1>Web development curriculum</h1>
      <CourseList courses={courses} />
    </div>
  )

const CourseList = ({ courses }) => (
<div>
    {courses.map(course => (
    <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    ))}
</div>
)

export default Course