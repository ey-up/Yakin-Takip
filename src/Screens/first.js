import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {getStandings, getFixtures, getScorers} from '../Actions/index';
import {connect} from 'react-redux';

import NetInfo from '@react-native-community/netinfo';
let kontrol = 1;
let kontrolFailed = 1;
const first = (props) => {
  
  const success = () => {
    if (kontrol == 1) {
      const params = true;
      props.getFixtures(params);
      props.getScorers(params);
      props.getStandings(params);
    }
    kontrol = 2;
  };

  const failed = () => {
    if (kontrolFailed == 1) {
      const params = false;
      props.getFixtures(params);
      props.getScorers(params);
      props.getStandings(params);
    }
    kontrolFailed = 2;
  };

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      success();
    } else if (!state.isConnected) {
      failed();
    }
  });
  unsubscribe();

  return <View></View>;
};

const mapStateToProps = (state) => {
  const {teams} = state.StandingsResponse;
  return {teams};
};

export default connect(mapStateToProps, {
  getStandings,
  getFixtures,
  getScorers,
})(first);
