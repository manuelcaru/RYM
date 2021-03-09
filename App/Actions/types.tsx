import { itemList } from "../Reducers/GetList";

//Create exports consts with all types
export const GET_LIST = 'GET_LIST';
export const GET_EPISODE = 'GET_EPISODE';

//Create interface per action
interface GetList {
    payload?: string,
    type: typeof GET_LIST,
    url: string,
    method: string,
    data?: {
        info: object,
        results: itemList[]
    },
    statusApi?: {
        ok: boolean
    },
}

interface GetEpisode {
    type: typeof GET_EPISODE,
    method: string,
    url: string,
    data?: {
        id?: number,
        name?: string,
        air_dat?: string,
        episode?: string,
        characters?: string[],
        url?: string,
        created?: string
    },
}

//export a single type with unions from all action types
export type GetActionTypes = GetList | GetEpisode;