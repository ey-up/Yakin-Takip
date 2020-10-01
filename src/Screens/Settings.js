import React from 'react';
import {Text, View} from 'react-native';

const Settings = () => {
  return (
   <View style={{height:30,width:330,borderColor:'green',borderWidth:1,alignSelf:'center',margin:25,flexDirection:'row',borderRadius:7}}>
       <View style={{borderRightColor:'green',borderRightWidth:1,width:70,alignItems:'center',justifyContent:'center'}}><Text>Deneme</Text></View>
       <View><Text>Kontfgrol</Text></View>
       <View><Text>Settings</Text></View>
   </View>
  );
};

export default Settings;
