import { useState, useEffect } from 'react'
import personService from './services/persons'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.label}</button>
  )
}

const Person = ({ person, removePerson }) => {
  const handleClick = () => {
    if (confirm(`Delete ${person.name}?`)) {
      removePerson(person)
    }
  }

  return (
    <p>{person.name} {person.number} <Button handleClick={handleClick} label='delete' /></p>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonList = (props) => {
  return (
    <div>
      {props.personsToShow.map(person =>
        <Person key={person.name} person={person} removePerson={props.removePerson} />
      )}
    </div>
  )
}

const SuccesNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='succes'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const t = persons.map(person => person.name)

    if (t.includes(newName)) {
      if (confirm(`${newName} is already added to the phonebook. Replace the old number with the new number?`)) {
        const i = t.indexOf(newName)
        updatePerson(persons[i].id, personObject)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setSuccesMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setSuccesMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(updatedPerson => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
        setNewName('')
        setNewNumber('')

        setSuccesMessage(`Updated number of ${personObject.name}`)
        setTimeout(() => {
          setSuccesMessage(null)
        }, 5000)
      })
  }

  const removePerson = (person) => {
    personService
      .remove(person.id)
      .then(removedPerson => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
        setSuccesMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccesMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(`${person.name} has already been deleted from server.`)

        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })

        setErrorMessage(`${person.name} has already been deleted from server.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccesNotification message={succesMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )

}

export default App