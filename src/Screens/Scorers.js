import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getScorers} from '../Actions/index';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
const Scorers = (props) => {
  const renderItem = ({item}) => {
    return (
      <View style={[styles.tableContainer]}>
        <View style={[styles.table, {width: '8%'}]}>
          <Text style={[styles.tableText, {}]}>{item.NO}</Text>
        </View>

        <View style={{width: '62%'}}>
          <Text style={styles.tableText}> {item.I} </Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableText}> {item.G} </Text>
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
            style={{flex: 1, marginTop: height / 45, marginLeft: width * 0.01}}>
            <View style={[styles.topBar]}>
              <View style={[styles.table, {width: '8%'}]}>
                <Text style={styles.tableText}> </Text>
              </View>

              <View style={{width: '62%'}}>
                <Text style={styles.tableText}>OYUNCU ADI</Text>
              </View>

              <View style={styles.table}>
                <Text style={styles.tableText}>GOL SAYISI </Text>
              </View>
            </View>

            <FlatList
              style={{flex: 1}}
              data={props.scorers}
              renderItem={renderItem}
              keyExtractor={(item) => item.I}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tableText: {
    fontSize: width / 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: height / 45,
    backgroundColor: '#f8e8cf',
    borderRadius: 3,
    width: width * 0.98,
  },
  tableContainer: {
    flexDirection: 'row',
    marginBottom: height / 68,
    borderBottomColor: 'black',
    paddingBottom: height / 97,
    borderBottomWidth: 0.3,
  },
  table: {
    width: '30%',
    //marginLeft: width/45,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red',
  },
});

const mapStateToProps = (state) => {
  const {scorers, loading} = state.ScorersResponse;
  return {scorers, loading};
};

export default connect(mapStateToProps, {getScorers})(Scorers);
