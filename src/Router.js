import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';



import {getStandings, getScorers, getFixtures} from '../src/Actions/index';
import {connect} from 'react-redux';

import firstScreen from './Screens/first';
import ScorersScreen from './Screens/Scorers';
import FixturesScreen from './Screens/Fixtures';
import TableScreen from './Screens/Table';
import {navigationRef} from './RootNavigation';

import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();
function Router(props) {
  const TabStack = createBottomTabNavigator();
  const TabStackScreen = () => {
    return (
      <TabStack.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size}) => {
            let iconName;
            if (route.name == 'Table') {
              iconName = 'trophy';
            } else if (route.name == 'Fixture') {
              iconName = 'calendar';
            } else if (route.name == 'Scorer') {
              iconName = 'soccer-ball-o';
            }
            return (
              <Icon
                type="FontAwesome"
                name={iconName}
                style={{color: focused ? '#187cff' : 'white', fontSize: size}}
              />
            );
          },
        })}
        tabBarOptions={{
          style: {height: height / 17},
          activeBackgroundColor: '#e2f0f1',
          inactiveBackgroundColor: '#187cff',
          showLabel: false,
        }}>
        <TabStack.Screen name="Table" component={TableStackScreen} />
        <TabStack.Screen name="Fixture" component={FixtureStackScreen} />
        <TabStack.Screen name="Scorer" component={ScorersStackScreen} />
      </TabStack.Navigator>
    );
  };

  const ScorersStack = createStackNavigator();
  const ScorersStackScreen = () => {
    return (
      <ScorersStack.Navigator>
        <ScorersStack.Screen
          name="Scorer"
          component={ScorersScreen}
          options={() => ({
            title: 'Golcüler',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#187cff',
              height: height / 14,
            },
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => props.getScorers('1')} 
                  style={{
                    marginRight: width / 20,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name={'refresh'}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </ScorersStack.Navigator>
    );
  };

  const TableStack = createStackNavigator();
  const TableStackScreen = () => {
    return (
      <TableStack.Navigator>
        <TableStack.Screen
          name="Table"
          component={TableScreen}
          options={() => ({
            title: 'Puan Durumu',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#187cff',
              height: height / 14,
            },
            // headerBackground: () => (
            //   <View
            //     style={{flex: 1, backgroundColor: 'gray',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            //      <View style={{height:17,width:9,backgroundColor:'blue',borderRadius:2,marginLeft:11}}></View>
            // <View style={{height:30,width:9,backgroundColor:'yellow',borderRadius:2}} ></View>
            // <View style={{height:40,width:9,backgroundColor:'blue',borderRadius:2}} ></View>
            // <View style={{height:30,width:9,backgroundColor:'yellow',borderRadius:2}} ></View>
            // <View style={{height:17,width:9,backgroundColor:'blue',borderRadius:2}} ></View>

            //   </View>
            // ),
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => props.getStandings('1')}
                  style={{
                    marginRight: width / 20,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name={'refresh'}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </TableStack.Navigator>
    );
  };

  const FixtureStack = createStackNavigator();
  const FixtureStackScreen = () => {
    return (
      <FixtureStack.Navigator>
        <FixtureStack.Screen
          name="Fixture"
          component={FixturesScreen}
          options={() => ({
            title: 'Fikstür',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#187cff',
              height: height / 14,
            },
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    props.getFixtures('1');
                  }}
                  style={{
                    marginRight: width / 20,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name={'refresh'}
                    style={{color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </FixtureStack.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="first">
        <Stack.Screen
          name="first"
          component={firstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={TabStackScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  const {fixtures} = state.FixturesResponse;
  return {fixtures};
};

export default connect(mapStateToProps, {
  getStandings,
  getScorers,
  getFixtures,
})(Router);
