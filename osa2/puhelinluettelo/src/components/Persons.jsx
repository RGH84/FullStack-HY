const Persons = ({ personsToShow, deletePerson }) => (
    <ul>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </ul>
  )

const Person = ({ person, deletePerson }) => (
<li>
    {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
</li>
)

export default Persons