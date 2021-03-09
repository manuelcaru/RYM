import {
  GET_LIST,
  GET_EPISODE,
  GetActionTypes,
} from '../Actions/types';

//define types for this Reducer
export type itemList = {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: { name: string, url: string }
  name: string
  origin: { name: string, url: string }
  species: string
  status: string
  type: string
  url: string
}
export type itemEpisode = {
  id?: number,
  name?: string,
  air_date?: string,
  episode?: string,
  characters?: string[],
  url?: string,
  created?: string
}
type httpOk = boolean;

export type GetInitialState = {
  list: itemList[],
  episodio: itemEpisode,
  list_ok: httpOk
}

//Create initial state for this reducer
const initialState: GetInitialState = {
  list: [],
  episodio: {},
  list_ok: true
}

//Create reducer
export function getListReducer(
  state = initialState,
  action: GetActionTypes
): GetInitialState {
  switch (action.type) {
    case GET_LIST:
      const listado = action.data?.results || [];
      const anterior = state.list || [];
      const ok = action.statusApi.ok;
      return {
        ...state,
        list: [...anterior, ...listado],
        list_ok: ok
      }
    case GET_EPISODE:
      const episodio = action.data ? action.data : {};
      return {
        ...state,
        episodio: episodio
      }
    default:
      return state
  }
}