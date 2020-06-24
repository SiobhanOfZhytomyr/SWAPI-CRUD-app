export const getAllPeople = state => {
  return state.people.allPeople;
}

export const getPersonById = (state, id) => {
  return state.people.allPeople.filter(person => person.id === id)
}