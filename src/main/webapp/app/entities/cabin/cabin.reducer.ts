import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICabin, defaultValue } from 'app/shared/model/cabin.model';

export const ACTION_TYPES = {
  SEARCH_CABINS: 'cabin/SEARCH_CABINS',
  FETCH_CABIN_LIST: 'cabin/FETCH_CABIN_LIST',
  FETCH_CABIN: 'cabin/FETCH_CABIN',
  CREATE_CABIN: 'cabin/CREATE_CABIN',
  UPDATE_CABIN: 'cabin/UPDATE_CABIN',
  DELETE_CABIN: 'cabin/DELETE_CABIN',
  RESET: 'cabin/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICabin>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CabinState = Readonly<typeof initialState>;

// Reducer

export default (state: CabinState = initialState, action): CabinState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CABINS):
    case REQUEST(ACTION_TYPES.FETCH_CABIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CABIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CABIN):
    case REQUEST(ACTION_TYPES.UPDATE_CABIN):
    case REQUEST(ACTION_TYPES.DELETE_CABIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CABINS):
    case FAILURE(ACTION_TYPES.FETCH_CABIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CABIN):
    case FAILURE(ACTION_TYPES.CREATE_CABIN):
    case FAILURE(ACTION_TYPES.UPDATE_CABIN):
    case FAILURE(ACTION_TYPES.DELETE_CABIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CABINS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CABIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CABIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CABIN):
    case SUCCESS(ACTION_TYPES.UPDATE_CABIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CABIN):
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

const apiUrl = 'api/cabins';
const apiSearchUrl = 'api/_search/cabins';

// Actions

export const getSearchEntities: ICrudSearchAction<ICabin> = query => ({
  type: ACTION_TYPES.SEARCH_CABINS,
  payload: axios.get<ICabin>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICabin> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CABIN_LIST,
  payload: axios.get<ICabin>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICabin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CABIN,
    payload: axios.get<ICabin>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICabin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CABIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICabin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CABIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICabin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CABIN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
