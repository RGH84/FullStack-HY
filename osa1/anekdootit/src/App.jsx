import { useState } from 'react'

const AnecdoteDisplay = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  const mostVotes = votes.indexOf(Math.max(...votes))
  const totalVotes = votes.reduce((a, b) => a + b, 0)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {totalVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <>
          <p>{anecdotes[mostVotes]}</p>
          <p>has {votes[mostVotes]} votes</p>
        </>
      )}
    </div>
  )
}

const Buttons = ({ onVote, onNext }) => (
  <div>
    <button onClick={onVote}>Vote</button>
    <button onClick={onNext}>Next anecdote</button>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Buttons onVote={voteAnecdote} onNext={getRandomAnecdote} />
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
