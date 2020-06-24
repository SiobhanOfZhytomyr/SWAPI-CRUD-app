import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'climate',
    'gravity',
    'orbital_period',
    'population',
    'terrain',
    'beloved',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({ name, climate, gravity, orbital_period, population, terrain,}) => ({
        name, 
        climate, 
        gravity, 
        orbital_period, 
        population, 
        terrain,
        beloved: false,
        id: nanoid()
    }))
}