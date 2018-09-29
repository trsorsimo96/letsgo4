import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDistributor, defaultValue } from 'app/shared/model/distributor.model';

export const ACTION_TYPES = {
  SEARCH_DISTRIBUTORS: 'distributor/SEARCH_DISTRIBUTORS',
  FETCH_DISTRIBUTOR_LIST: 'distributor/FETCH_DISTRIBUTOR_LIST',
  FETCH_DISTRIBUTOR: 'distributor/FETCH_DISTRIBUTOR',
  CREATE_DISTRIBUTOR: 'distributor/CREATE_DISTRIBUTOR',
  UPDATE_DISTRIBUTOR: 'distributor/UPDATE_DISTRIBUTOR',
  DELETE_DISTRIBUTOR: 'distributor/DELETE_DISTRIBUTOR',
  SET_BLOB: 'distributor/SET_BLOB',
  RESET: 'distributor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDistributor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DistributorState = Readonly<typeof initialState>;

// Reducer

export default (state: DistributorState = initialState, action): DistributorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_DISTRIBUTORS):
    case REQUEST(ACTION_TYPES.FETCH_DISTRIBUTOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DISTRIBUTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DISTRIBUTOR):
    case REQUEST(ACTION_TYPES.UPDATE_DISTRIBUTOR):
    case REQUEST(ACTION_TYPES.DELETE_DISTRIBUTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_DISTRIBUTORS):
    case FAILURE(ACTION_TYPES.FETCH_DISTRIBUTOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DISTRIBUTOR):
    case FAILURE(ACTION_TYPES.CREATE_DISTRIBUTOR):
    case FAILURE(ACTION_TYPES.UPDATE_DISTRIBUTOR):
    case FAILURE(ACTION_TYPES.DELETE_DISTRIBUTOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DISTRIBUTORS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISTRIBUTOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISTRIBUTOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DISTRIBUTOR):
    case SUCCESS(ACTION_TYPES.UPDATE_DISTRIBUTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DISTRIBUTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/distributors';
const apiSearchUrl = 'api/_search/distributors';

// Actions

export const getSearchEntities: ICrudSearchAction<IDistributor> = query => ({
  type: ACTION_TYPES.SEARCH_DISTRIBUTORS,
  payload: axios.get<IDistributor>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IDistributor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DISTRIBUTOR_LIST,
  payload: axios.get<IDistributor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDistributor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DISTRIBUTOR,
    payload: axios.get<IDistributor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDistributor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DISTRIBUTOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDistributor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DISTRIBUTOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDistributor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DISTRIBUTOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
