/* eslint-disable prettier/prettier */
import { GET_LIST, GET_EPISODE, GetActionTypes } from './types';


const apiUrl = 'https://rickandmortyapi.com/api'

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