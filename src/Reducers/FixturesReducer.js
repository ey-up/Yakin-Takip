import {
  FIXTURE_FAILED,
  FIXTURE_START,
  FIXTURE_SUCCESS,
  ADD_FIXTURE_LOCAL,
} from '../Actions/Types';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  fixtures: [],
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIXTURE_START:
      return {...state, loading: true};

    case FIXTURE_SUCCESS: {
      
      if (action.payload[0].T.length > 12) {
        for (let index = 0; index < action.payload.length; index++) {
          const element = action.payload[index].T;
          const saat = element.split(' ').pop();
          action.payload[index].S = saat;
          const spaceIndex = element.indexOf(' ');
          action.payload[index].T = element.slice(0, spaceIndex);
        }
      }
     
      AsyncStorage.setItem(ADD_FIXTURE_LOCAL, JSON.stringify(action.payload));
      return {...state, fixtures: action.payload, loading: false};
    }

    case FIXTURE_FAILED: {
      return {...state, loading: false, fixtures: action.payload};
    }
    default:
      return state;
  }
};
