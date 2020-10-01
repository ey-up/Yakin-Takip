import { combineReducers } from 'redux';
import StandingsReducer from './StandingsReducer';
import FixturesReducer from './FixturesReducer';
import ScorersReducer from './ScorersReducer';


export default combineReducers({
    FixturesResponse : FixturesReducer,
    StandingsResponse: StandingsReducer,
    ScorersResponse : ScorersReducer,
});