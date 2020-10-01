import React, { useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import {getStandings} from '../Actions/index';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Table = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={[styles.tableContainer]}>
        <View style={[styles.table, {width: width / 23,alignItems:"flex-end",marginLeft:5}]}>
          <Text style={styles.tableText}> {item.NO} </Text>
        </View>

        <View style={{width: width / 3,marginLeft:7}}>
          <Text style={styles.tableText}>{item.N}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}>{item.O}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}>{item.G}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}>{item.B}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}>{item.M}</Text>
        </View>

       
        <View style={styles.table}>
          <Text style={styles.tableText}>{item.AV}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}>{item.P}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {props.loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView horizontal={true}>
          <View
            style={{
              flex: 1,
              marginTop: height / 45,
              marginHorizontal: width / 100,
            }}>
            {/* <View style={styles.header}>
            <Text style={styles.headerText}>Puan Durumu</Text>
          </View> */}
            <View style={[styles.topBar]}>
              <View style={[styles.table,{width: width / 23,alignItems:"flex-end",marginLeft:5}]}>
                <Text style={styles.tableText}></Text>
              </View>

              <View style={{width: width / 3,marginLeft:7}}>
                <Text style={styles.tableText}>TAKIM</Text>
              </View>

              <View style={[styles.table,]}>
                <Text style={styles.tableText}>O</Text>
              </View>

              <View style={styles.table}>
                <Text style={styles.tableText}>G</Text>
              </View>

              <View style={[styles.table ,]}>
                <Text style={styles.tableText}>B</Text>
              </View>

              <View style={styles.table}>
                <Text style={styles.tableText}>M</Text>
              </View>

              
              <View style={styles.table}>
                <Text style={styles.tableText}>+/-</Text>
              </View>

              <View style={styles.table}>
                <Text style={styles.tableText}>P</Text>
              </View>
            </View>
            <FlatList
              style={{flex: 1}}
              data={props.teams}
              renderItem={renderItem}
              keyExtractor={(item) => item.N}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    marginBottom: height / 68,
    borderBottomColor: 'black',
    paddingBottom: height / 97,
    borderBottomWidth: 0.3,
  },
  table: {
    width: width / 13.7,
    marginLeft: width / 45,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red',
  },
  tableText: {
    fontSize: width / 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    //borderBottomColor: 'gray',
    //borderBottomWidth: 0.2,
    marginBottom: height / 30,
    marginTop: height / 55,
    //backgroundColor: 'blue',
  },
  headerText: {
    letterSpacing: width / 82,
    color: '#333',
    fontWeight: 'bold',
    fontSize: width / 21,
    fontFamily: 'oldstyle-nums',
    textShadowRadius: 5,
    textShadowColor: 'gray',
    textDecorationColor: 'red',
    fontStyle: 'italic',
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: height / 45,
    backgroundColor: '#f8e8cf',
    borderRadius: 3,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
});

const mapStateToProps = (state) => {
  const {teams, loading} = state.StandingsResponse;
  return {teams, loading};
};

export default connect(mapStateToProps, {getStandings})(Table);
