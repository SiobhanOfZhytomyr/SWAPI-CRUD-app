import {nanoid} from "nanoid";

export const starshipsColumns = [
    'name', 
    'model', 
    'starship_class', 
    'manufacturer', 
    'hyperdrive_rating', 
    'MGLT', 
    'crew',
    'beloved',
]

export const getStarships = async () => {
    const starshipsResponse = await (await fetch('https://swapi.dev/api/starships')).json();

    return starshipsResponse.results.map(({ name, model, starship_class, manufacturer, hyperdrive_rating, MGLT, crew,}) => ({
        name, 
        model, 
        starship_class, 
        manufacturer, 
        hyperdrive_rating, 
        MGLT, 
        crew,
        beloved: false,
        id: nanoid()
    }))
}