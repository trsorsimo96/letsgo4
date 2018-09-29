import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITown, defaultValue } from 'app/shared/model/town.model';

export const ACTION_TYPES = {
  SEARCH_TOWNS: 'town/SEARCH_TOWNS',
  FETCH_TOWN_LIST: 'town/FETCH_TOWN_LIST',
  FETCH_TOWN: 'town/FETCH_TOWN',
  CREATE_TOWN: 'town/CREATE_TOWN',
  UPDATE_TOWN: 'town/UPDATE_TOWN',
  DELETE_TOWN: 'town/DELETE_TOWN',
  RESET: 'town/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITown>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TownState = Readonly<typeof initialState>;

// Reducer

export default (state: TownState = initialState, action): TownState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TOWNS):
    case REQUEST(ACTION_TYPES.FETCH_TOWN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TOWN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TOWN):
    case REQUEST(ACTION_TYPES.UPDATE_TOWN):
    case REQUEST(ACTION_TYPES.DELETE_TOWN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TOWNS):
    case FAILURE(ACTION_TYPES.FETCH_TOWN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TOWN):
    case FAILURE(ACTION_TYPES.CREATE_TOWN):
    case FAILURE(ACTION_TYPES.UPDATE_TOWN):
    case FAILURE(ACTION_TYPES.DELETE_TOWN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TOWNS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOWN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOWN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TOWN):
    case SUCCESS(ACTION_TYPES.UPDATE_TOWN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TOWN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/towns';
const apiSearchUrl = 'api/_search/towns';

// Actions

export const getSearchEntities: ICrudSearchAction<ITown> = query => ({
  type: ACTION_TYPES.SEARCH_TOWNS,
  payload: axios.get<ITown>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITown> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOWN_LIST,
  payload: axios.get<ITown>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITown> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TOWN,
    payload: axios.get<ITown>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITown> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TOWN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITown> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TOWN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITown> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TOWN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
