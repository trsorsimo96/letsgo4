import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConfigCommission, defaultValue } from 'app/shared/model/config-commission.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGCOMMISSIONS: 'configCommission/SEARCH_CONFIGCOMMISSIONS',
  FETCH_CONFIGCOMMISSION_LIST: 'configCommission/FETCH_CONFIGCOMMISSION_LIST',
  FETCH_CONFIGCOMMISSION: 'configCommission/FETCH_CONFIGCOMMISSION',
  CREATE_CONFIGCOMMISSION: 'configCommission/CREATE_CONFIGCOMMISSION',
  UPDATE_CONFIGCOMMISSION: 'configCommission/UPDATE_CONFIGCOMMISSION',
  DELETE_CONFIGCOMMISSION: 'configCommission/DELETE_CONFIGCOMMISSION',
  RESET: 'configCommission/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigCommission>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ConfigCommissionState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigCommissionState = initialState, action): ConfigCommissionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGCOMMISSIONS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGCOMMISSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGCOMMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGCOMMISSION):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGCOMMISSION):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGCOMMISSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGCOMMISSIONS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGCOMMISSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGCOMMISSION):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGCOMMISSION):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGCOMMISSION):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGCOMMISSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGCOMMISSIONS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGCOMMISSION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGCOMMISSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGCOMMISSION):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGCOMMISSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGCOMMISSION):
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

const apiUrl = 'api/config-commissions';
const apiSearchUrl = 'api/_search/config-commissions';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigCommission> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGCOMMISSIONS,
  payload: axios.get<IConfigCommission>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigCommission> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONFIGCOMMISSION_LIST,
  payload: axios.get<IConfigCommission>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IConfigCommission> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGCOMMISSION,
    payload: axios.get<IConfigCommission>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigCommission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGCOMMISSION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigCommission> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGCOMMISSION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigCommission> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGCOMMISSION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
