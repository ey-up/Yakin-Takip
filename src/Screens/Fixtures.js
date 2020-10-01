import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';



import {connect} from 'react-redux';

import { getFixtures} from '../Actions/index';

const {width, height} = Dimensions.get('window');



const Fixtures = (props) => {

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={[styles.Date, {borderRightWidth: 1}]}>
          <Text style={{fontSize: width / 34}}> {item.T} </Text>
          <Text style={{fontSize: width / 34}}> {item.S} </Text>
        </View>

        <View style={[styles.Team, {alignItems: 'flex-end'}]}>
          <Text style={[styles.fiksturText, {}]}>{item.E}</Text>
        </View>

        <View style={[styles.Team, {width: '6%', alignItems: 'flex-end'}]}>
          <Text>{item.ES}</Text>
        </View>

        <View style={[styles.Date, {width: '3%'}]}>
          <Text>-</Text>
        </View>

        <View style={[styles.Team, {width: '6%', alignItems: 'flex-start'}]}>
          <Text>{item.DS}</Text>
        </View>

        <View style={[styles.Team, {}]}>
          <Text style={[styles.fiksturText, {}]}>{item.D}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, margin: 7,marginTop:0 }}>
        
{/*         
        <View style={styles.header}>
          <Text
            onPress={ async()  => {
              let list   
              list = await AsyncStorage.getItem('add_fixture_local');
              console.log("bakberi-> ",list)
            }}
            style={styles.headerText}>
            Bu Haftanın Maçları
          </Text>
        </View> */}

        {props.loading ? (
          <ActivityIndicator
            style={{marginTop: 150}}
            size="large"
            color="black"
          />
        ) : (
          <FlatList
            style={{flex: 1}}
            data={props.fixtures}
            renderItem={renderItem}
            keyExtractor={(item) => item.D}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fiksturText: {
    letterSpacing: width / 750,
    fontSize: width / 38,
    marginLeft: 2,
  },
  headerText: {
    letterSpacing: width / 82,
    color: '#333',
    fontWeight: 'bold',
    fontSize: width / 32,
    fontFamily: 'oldstyle-nums',
    textShadowRadius: 5,
    textShadowColor: 'gray',
    textDecorationColor: 'red',
    fontStyle: 'italic',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    marginBottom: height / 30,
    marginTop: height / 55,
  },
  container: {
    height: height / 11,
    width: '100%',
    borderColor: 'green',
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    marginVertical: height / 40,
    
  },
  Date: {
    borderRightColor: 'green',
    width: '21%',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  Team: {
    borderRightColor: 'green',
    width: '32%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const {fixtures, loading} = state.FixturesResponse;
  return {fixtures, loading};
};

export default connect(mapStateToProps, {getFixtures})(Fixtures);
