import { itemList } from "../Reducers/GetList";

export const GET_LIST = 'GET_LIST';
export const GET_EPISODE = 'GET_EPISODE';

interface GetList {
    payload?: string,
    type: typeof GET_LIST,
    url: string,
    method: string,
    data?: {
        info: object,
        results: itemList[]
    },
    statusApi: {
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

export type GetActionTypes = GetList | GetEpisode;