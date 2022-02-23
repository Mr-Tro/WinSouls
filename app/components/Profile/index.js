// import 'react-native-gesture-handler';
import * as React from 'react';
import { Picker, SafeAreaView, View, FlatList, Text, TextInput,
  StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from "react";
import MyModal from '../myModal';
import renderItem from '../renderItem';

function Profile({ route, navigation }) {
  const user_details = {status:'Data Matched',full_name:'Test',cell:'0000',id:'1'};
  // const { user_details } = route.params;
  const [busName, setBusName] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  function hideModal() {
    setModalVisible(!modalVisible);
  }
  const [confirmText, setConfirmText] = useState('');
 
  /////////////////////////////////////////
  function goToNext() {
    let sendJSON = {data:'data'};//,liqour_licence:liqour_licence,food_permit:food_permit
    let info = {...user_details, ...sendJSON};
    navigation.navigate('Business 2',{info:info});
  }
  function confirmInfo() {
    if (true) {//&&liqour_licence!=''&&food_permit!=''
        setConfirmText('Confirm');//+' \nLiqour licence: '+liqour_licence+' \nFood permit: '+food_permit
      
      setModalVisible(true);
      // 
    }
    else{
      alert('Please fill all fields.');
    }
  }
  const DATA = [
    {
      id: '1',
      title: "User Profile",
      type: 'label'
    },{
      id: '2',
      title: "Business Name",
      value: busName,
      style: styles.txt,
      type: 'textbox',
      func: setBusName
    }
    ,{
      id: "15",
      title: "Next",
      style: styles.btn,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => confirmInfo(),
    },{
      id: '16',
      title: "Modal",
      value: confirmText,
      type: 'modal',
    },
  ];
  
  return (
    
    <SafeAreaView style={{ flex: 1, alignItems: 'center', width:'95%', marginLeft:'2.5%', marginTop:'10%' }}>
      <FlatList
        data={DATA}
        style = {{width:'90%'}}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


export default Profile;

const styles = StyleSheet.create({
  heading: {
      // marginVertical: 10,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      width: '100%',
      height: 40
  },
  txt:{
      width: '100%',
      height: 40,
      // borderBottomWidth: '100%',
      // textAlign: "center",
      borderColor: "grey",
      // fontWeight: 'bold',
      borderWidth: StyleSheet.hairlineWidth,
      // borderRadius: 5,
      marginBottom: 10
  },
  pickerCont:{
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey'
  },
  picker:{
    width: '100%',
    textAlign: "center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn:{
      width: '100%',
      padding: 15,
      textAlign: "center",
      backgroundColor: '#3293a8',
      color: 'white',
      // borderWidth: 1,
      borderRadius: 5,
      marginBottom: 30
  },

  timebtn:{
    backgroundColor: 'grey',
    width:'49%', marginLeft:'0.5%',marginRight:'0.5%',padding:10
  },
  timetxt:{
    textAlign: 'center',
    color: 'white'
  }
});