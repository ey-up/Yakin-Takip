import axios from 'axios';
import {ADD_FIXTURE_LOCAL, ADD_SCORERS_LOCAL, ADD_TEAMS_LOCAL} from './Types';
import * as RootNavigation from '../RootNavigation';

import AsyncStorage from '@react-native-community/async-storage';

export const get = async (dispatch, start, success, failed, url) => {
  const type = url.split('/').pop();
  dispatch({type: start});
  axios({
    method: 'get',
    url: url,
  })
    .then((response) => {
      dispatch({type: success, payload: response.data});
      if (type == 'PuanDurumu') {
        RootNavigation.replace('Tabs');
      }
    })
    .catch(async (err) => {
      let list;
      if (type == 'Fikstur') {
        list = await AsyncStorage.getItem(ADD_FIXTURE_LOCAL);
      } else if (type == 'PuanDurumu') {
        list = await AsyncStorage.getItem(ADD_TEAMS_LOCAL);
        RootNavigation.replace('Tabs');
      } else if (type == 'gol') {
        list = await AsyncStorage.getItem(ADD_SCORERS_LOCAL);
      }

      dispatch({type: failed, payload: JSON.parse(list)});
    });
};
