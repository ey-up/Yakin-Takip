import {
  ADD_SCORERS_LOCAL,
  SCORER_FAILED,
  SCORER_START,
  SCORER_SUCCESS,
  SCORER_URL,
} from './Types';
import {get} from './api';
import AsyncStorage from '@react-native-community/async-storage';

export const getScorers = (params) => {
  return (dispatch) => {
    if (params) {
      get(dispatch, SCORER_START, SCORER_SUCCESS, SCORER_FAILED, SCORER_URL);
    } else {
      dispatch({type: SCORER_START});
      getList(dispatch);
    }
  };
};

const getList = async (dispatch) => {
  let list;
  list = await AsyncStorage.getItem(ADD_SCORERS_LOCAL);
  dispatch({type: SCORER_FAILED, payload: JSON.parse(list)});
};
