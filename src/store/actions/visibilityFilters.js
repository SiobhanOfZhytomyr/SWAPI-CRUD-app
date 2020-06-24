export const VISIBILITY_FILTER = {
    ALL: 'ALL',
    BELOVED: 'BELOVED',
    NOT_BELOVED: 'NOT_BELOVED'
}

export const SET_FILTER = 'SET_FILTER'

export function set_filter(filter){
    return {type: SET_FILTER, filter}
}