import {
  SCORER_FAILED,
  SCORER_START,
  SCORER_SUCCESS,
  ADD_SCORERS_LOCAL,
} from '../Actions/Types';

import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  scorers: [],
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCORER_START:
      return {...state, loading: true};

    case SCORER_SUCCESS: {
      for (let index = 0; index < action.payload.length; index++) {
        action.payload[index].NO = index + 1;
      }
      AsyncStorage.setItem(ADD_SCORERS_LOCAL, JSON.stringify(action.payload));
      return {...state, scorers: action.payload, loading: false};
    }

    case SCORER_FAILED: {
      return {...state, loading: false, scorers: action.payload};
    }

    default:
      return state;
  }
};
