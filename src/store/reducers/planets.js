import {SET_PLANETS, UPDATE_PLANET, DELETE_PLANET, CHANGE_BELOVED_STATUS, ADD_PLANET} from '../actions/planets'
import {SET_FILTER, VISIBILITY_FILTER} from '../actions/visibilityFilters'
const initialState = {
  allPlanets: [],
  filter: VISIBILITY_FILTER.ALL,
}

function planets(state = initialState, action) {
  switch(action.type) {
    case SET_PLANETS:
      return {...state,
        allPlanets: action.planets
      };
    case DELETE_PLANET:
      return {...state,
        allPlanets: state.allPlanets.filter(planet => planet.id !== action.id)
      };
    case CHANGE_BELOVED_STATUS:
      return {...state,
        allPlanets: state.allPlanets.map((planet) => {
          return planet.id === action.id ? {...planet, beloved: !planet.beloved} : planet
      })
      };
    case ADD_PLANET:
      return {...state,
        allPlanets: [...state.allPlanets, action.planet]
      };
    case UPDATE_PLANET:
      return {...state,
        allPlanets: state.allPlanets.map((plnt) => {
          return plnt.id === action.planet.id ? {...action.planet, id: plnt.id} : plnt
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

export default planets;