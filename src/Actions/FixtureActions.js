import {
  ADD_FIXTURE_LOCAL,
  FIXTURE_FAILED,
  FIXTURE_START,
  FIXTURE_SUCCESS,
  FIXTURE_URL,
} from './Types';
import {get} from './api';
import AsyncStorage from '@react-native-community/async-storage';

export const getFixtures = (params) => {
  return (dispatch) => {
    if (params) {
      get(
        dispatch,
        FIXTURE_START,
        FIXTURE_SUCCESS,
        FIXTURE_FAILED,
        FIXTURE_URL,
      );
    } else {
      dispatch({type: FIXTURE_START});
      getList(dispatch);
    }
  };
};

const getList = async (dispatch) => {
  let list;
  list = await AsyncStorage.getItem(ADD_FIXTURE_LOCAL);
  dispatch({type: FIXTURE_FAILED, payload: JSON.parse(list)});
};
