import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map( anecdote => anecdote.id !== id ? anecdote : action.data ).sort((a,b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
    return state
    }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedAnecdotes,
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer