import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.people.filter

export const getAllPeople = state => {
  return state.people.allPeople;
}

export const getVisiblePeople = createSelector(
    [getVisibilityFilter, getAllPeople],
    (visibilityFilter, people) => {
        switch (visibilityFilter) {
          case 'ALL':
            return people
          case 'BELOVED':
            return people.filter(p => p.beloved)
          case 'NOT_BELOVED':
            return people.filter(p => !p.beloved)
        }
      }
    )

export const getPeopleFilter = state => {
  return state.people.filter;
}
export const getPersonById = (state, id) => {
  return state.people.allPeople.filter(person => person.id === id)
}