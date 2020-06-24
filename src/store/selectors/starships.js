import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.starships.filter

export const getAllStarships = state => {
    return state.starships.allStarships;
  }

  export const getVisibleStarships = createSelector(
    [getVisibilityFilter, getAllStarships],
    (visibilityFilter, starships) => {
        switch (visibilityFilter) {
          case 'ALL':
            return starships
          case 'BELOVED':
            return starships.filter(p => p.beloved)
          case 'NOT_BELOVED':
            return starships.filter(p => !p.beloved)
        }
      }
    )

  export const getStarshipById = (state, id) => {
    return state.starships.allStarships.filter(starship => starship.id === id)
  }

  export const getStarshipsFilter = state => {
    return state.starships.filter;
  }