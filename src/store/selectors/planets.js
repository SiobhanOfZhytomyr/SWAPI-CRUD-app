export const getAllPlanets = state => {
    return state.planets.allPlanets;
  }
  
  export const getPlanetById = (state, id) => {
    return state.planets.allPlanets.filter(planet => planet.id === id)
  }