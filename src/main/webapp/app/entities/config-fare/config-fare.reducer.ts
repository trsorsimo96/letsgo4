import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConfigFare, defaultValue } from 'app/shared/model/config-fare.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGFARES: 'configFare/SEARCH_CONFIGFARES',
  FETCH_CONFIGFARE_LIST: 'configFare/FETCH_CONFIGFARE_LIST',
  FETCH_CONFIGFARE: 'configFare/FETCH_CONFIGFARE',
  CREATE_CONFIGFARE: 'configFare/CREATE_CONFIGFARE',
  UPDATE_CONFIGFARE: 'configFare/UPDATE_CONFIGFARE',
  DELETE_CONFIGFARE: 'configFare/DELETE_CONFIGFARE',
  RESET: 'configFare/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigFare>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ConfigFareState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigFareState = initialState, action): ConfigFareState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGFARES):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGFARE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGFARE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGFARE):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGFARE):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGFARE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGFARES):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGFARE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGFARE):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGFARE):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGFARE):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGFARE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGFARES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGFARE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGFARE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGFARE):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGFARE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGFARE):
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

const apiUrl = 'api/config-fares';
const apiSearchUrl = 'api/_search/config-fares';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigFare> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGFARES,
  payload: axios.get<IConfigFare>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigFare> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONFIGFARE_LIST,
  payload: axios.get<IConfigFare>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IConfigFare> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGFARE,
    payload: axios.get<IConfigFare>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigFare> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGFARE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigFare> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGFARE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigFare> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGFARE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
