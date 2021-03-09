/* eslint-disable prettier/prettier */
import { GET_LIST, GET_EPISODE, GetActionTypes } from './types';

//Create API URL, in case to be private api, should be added to .env file
const apiUrl = 'https://rickandmortyapi.com/api'

//Create actions to retrieve list and episodes
export function getList(page: number): GetActionTypes {
    const url = `${apiUrl}/character?page=${page}`;
    const method = 'GET';
    return { type: GET_LIST, url, method};
}

export function getEpisode(episode: number): GetActionTypes {
    const url = `${apiUrl}/episode/${episode}`;
    const method = 'GET';
    return { type: GET_EPISODE, url, method};
}