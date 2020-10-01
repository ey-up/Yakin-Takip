import {
  STANDINGS_URL,
  STANDINGS_FAILED,
  STANDINGS_START,
  STANDINGS_SUCCESS,
  ADD_TEAMS_LOCAL,
} from './Types';
import {get} from './api';
import * as RootNavigation from '../RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';

export const getStandings = (params) => {
  return (dispatch) => {
    if (params) {
      get(
        dispatch,
        STANDINGS_START,
        STANDINGS_SUCCESS,
        STANDINGS_FAILED,
        STANDINGS_URL,
      );
    } else {
      dispatch({type: STANDINGS_START});
      getList(dispatch);
      RootNavigation.replace('Tabs');
    }
  };
};

const getList = async (dispatch) => {
  let list;
  list = await AsyncStorage.getItem(ADD_TEAMS_LOCAL);
  dispatch({type: STANDINGS_FAILED, payload: JSON.parse(list)});
};
