import {SET_STARSHIPS, UPDATE_STARSHIP, DELETE_STARSHIP, CHANGE_BELOVED_STATUS, ADD_STARSHIP} from '../actions/starships'
import {SET_FILTER, VISIBILITY_FILTER} from '../actions/visibilityFilters'
const initialState = {
  allStarships: [],
  filter: VISIBILITY_FILTER.ALL,
}

function starships(state = initialState, action) {
  switch(action.type) {
    case SET_STARSHIPS:
      return {...state,
        allStarships: action.starships
      };
    case DELETE_STARSHIP:
      return {...state,
        allStarships: state.allStarships.filter(starship => starship.id !== action.id)
      };
    case CHANGE_BELOVED_STATUS:
      return {...state,
        allStarships: state.allStarships.map((starship) => {
          return starship.id === action.id ? {...starship, beloved: !starship.beloved} : starship
      })
      };
    case ADD_STARSHIP:
      return {...state,
        allStarships: [...state.allStarships, action.starship]
      };
    case UPDATE_STARSHIP:
      return {...state,
        allStarships: state.allStarships.map((strshp) => {
          return strshp.id === action.starship.id ? {...action.starship, id: strshp.id} : strshp
        })
      };
      case SET_FILTER:
        return {...state,
        filter: action.filter,
        };
    default:
      return state;
  }
}

export default starships;