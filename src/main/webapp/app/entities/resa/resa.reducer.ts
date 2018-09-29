import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResa, defaultValue } from 'app/shared/model/resa.model';

export const ACTION_TYPES = {
  SEARCH_RESAS: 'resa/SEARCH_RESAS',
  FETCH_RESA_LIST: 'resa/FETCH_RESA_LIST',
  FETCH_RESA: 'resa/FETCH_RESA',
  CREATE_RESA: 'resa/CREATE_RESA',
  UPDATE_RESA: 'resa/UPDATE_RESA',
  DELETE_RESA: 'resa/DELETE_RESA',
  RESET: 'resa/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResa>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ResaState = Readonly<typeof initialState>;

// Reducer

export default (state: ResaState = initialState, action): ResaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RESAS):
    case REQUEST(ACTION_TYPES.FETCH_RESA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESA):
    case REQUEST(ACTION_TYPES.UPDATE_RESA):
    case REQUEST(ACTION_TYPES.DELETE_RESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RESAS):
    case FAILURE(ACTION_TYPES.FETCH_RESA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESA):
    case FAILURE(ACTION_TYPES.CREATE_RESA):
    case FAILURE(ACTION_TYPES.UPDATE_RESA):
    case FAILURE(ACTION_TYPES.DELETE_RESA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RESAS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESA):
    case SUCCESS(ACTION_TYPES.UPDATE_RESA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESA):
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

const apiUrl = 'api/resas';
const apiSearchUrl = 'api/_search/resas';

// Actions

export const getSearchEntities: ICrudSearchAction<IResa> = query => ({
  type: ACTION_TYPES.SEARCH_RESAS,
  payload: axios.get<IResa>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IResa> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESA_LIST,
  payload: axios.get<IResa>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IResa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESA,
    payload: axios.get<IResa>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IResa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
