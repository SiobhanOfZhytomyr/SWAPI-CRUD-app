import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.planets.filter

export const getAllPlanets = state => {
    return state.planets.allPlanets;
  }

export const getVisiblePlanets = createSelector(
    [getVisibilityFilter, getAllPlanets],
    (visibilityFilter, planets) => {
        switch (visibilityFilter) {
          case 'ALL':
            return planets
          case 'BELOVED':
            return planets.filter(p => p.beloved)
          case 'NOT_BELOVED':
            return planets.filter(p => !p.beloved)
        }
      }
    )

export const getPlanetsFilter = state => {
      return state.planets.filter;
    }    
export const getPlanetById = (state, id) => {
    return state.planets.allPlanets.filter(planet => planet.id === id)
  }