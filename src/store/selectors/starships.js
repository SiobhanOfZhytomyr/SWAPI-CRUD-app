export const getAllStarships = state => {
    return state.starships.allStarships;
  }
  
  export const getStarshipById = (state, id) => {
    return state.starships.allStarships.filter(starship => starship.id === id)
  }