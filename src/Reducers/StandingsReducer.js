import {
  STANDINGS_FAILED,
  STANDINGS_START,
  STANDINGS_SUCCESS,
  ADD_TEAMS_LOCAL,
} from '../Actions/Types';

import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  teams: [],
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STANDINGS_START:
      return {...state, loading: true};

    case STANDINGS_SUCCESS: {
      for (let index = 0; index < action.payload.length; index++) {
        action.payload[index].NO = index + 1;
      }
      AsyncStorage.setItem(ADD_TEAMS_LOCAL, JSON.stringify(action.payload));
      return {...state, teams: action.payload, loading: false};
    }

    case STANDINGS_FAILED: {
      return {...state, loading: false, teams: action.payload};
    }
    default:
      return state;
  }
};
