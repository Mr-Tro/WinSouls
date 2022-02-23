// import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { Picker, SafeAreaView, View, FlatList, Text, TextInput,
  StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from "react";
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import myMap from '../LeafletMap';
import { WebView } from 'react-native-webview';
// import MyModal from '../myModal';
// import areaId from '../myModal/areaId';
import html_script from '../LeafletMap/html_script';
import renderItem from '../renderItem';

const CAPTURE_LOCATIONS_TASK = 'background-location-task';

async function save_txt_file(name,text) {
  let file_name = FileSystem.documentDirectory + name + '.txt';
  let file_contents = await FileSystem.writeAsStringAsync(file_name, text, { encoding: FileSystem.EncodingType.UTF8 });
}
async function retrieve_txt_file(name) {
  let file_name = FileSystem.documentDirectory + name + '.txt';
  let file_contents = await FileSystem.readAsStringAsync(file_name,{ encoding: FileSystem.EncodingType.UTF8 });
  return file_contents;
}

function SW({ route, navigation }) {
  const user_details = {status:'Data Matched',full_name:'Test',cell:'0000',id:'1'};
  // const { user_details } = route.params;
  // console.log(user_details);
  const [captured_locations, set_captured_locations] = useState([]);
  const [coordsArr, set_coordsArr] = useState([]);
  const [area_ID, set_area_ID] = useState('');
  const [area_picks, set_area_picks] = useState([]);
  const [lead_user_btn_disabled, set_lead_user_btn_disabled] = useState(false);
  const [reg_user_btn_disabled, set_reg_user_btn_disabled] = useState(false);
  const [capture_btn_disabled, set_capture_btn_disabled] = useState(true);
  const [end_btn_disabled, set_end_btn_disabled] = useState(true);
  const [use_btn_disabled, set_use_btn_disabled] = useState(true);

  const [person_name, set_person_name] = useState('');
  const [phone_number, set_phone_number] = useState('');
  const [social_number, set_social_number] = useState('');
  const [state, set_state] = useState('');
  const [receptive, set_receptive] = useState('');
  const [followup, set_followup] = useState('');
  const [single_location, set_single_location] = useState(null);
  
  const [webview_key, set_webview_key] = useState(0);
  const [current_location, set_current_location] = useState('-26.2041,28.0473');
  const [zoom_level, set_zoom_level] = useState(13);

  async function fetchMyCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    let coords = JSON.stringify(location.coords.latitude) + ',' + JSON.stringify(location.coords.longitude);
    set_current_location(coords);
    // console.log(current_location);
  }

  fetchMyCurrentLocation()

  async function check_if_running() {
    let file_name = FileSystem.documentDirectory + 'running' + '.txt';
    let file_existance = await FileSystem.getInfoAsync(file_name,{ encoding: FileSystem.EncodingType.UTF8 });
    if (file_existance.exists) {
      currently_soul_winning('running');
    }
  }
  check_if_running();
  
  // setInterval(()=>{ set_webview_key(webview_key+1); console.log('webview_key: '+webview_key); },6000);

  function makeTwoDigits (time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
  }
  var backgroundLocationsCapture = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === 'granted') {
      alert('Background permissions granted!');
      await Location.startLocationUpdatesAsync(CAPTURE_LOCATIONS_TASK, {
        // accuracy: Location.Accuracy.Balanced,
        accuracy: Location.Accuracy.Highest,
        // distanceInterval: 3, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 3000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: 'Your location is being tracked',
          notificationBody: 'Tracking will stop when you end soul winning.',
        },
      });
    }
  };
  function stopCapturingBackroundLocations() {
    // stop capturing
    Location.hasStartedLocationUpdatesAsync(CAPTURE_LOCATIONS_TASK).then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync(CAPTURE_LOCATIONS_TASK);
        save_txt_file('running','Nothing.');
        currently_soul_winning('running');
        alert('Soul winning done!');
      }
    });
    set_zoom_level(10);
    set_webview_key(webview_key+1);
    set_capture_btn_disabled(true);
    set_end_btn_disabled(true);
    set_reg_user_btn_disabled(false);
    set_lead_user_btn_disabled(false);
    set_use_btn_disabled(false);
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  function hideModal() {
    setModalVisible(!modalVisible);
  }
  function hideModal2() {
    setModalVisible2(!modalVisible2);
  }
  function hideModal3() {
    setModalVisible3(!modalVisible3);
  }
  const [confirmText, setConfirmText] = useState('');
  
  async function currently_soul_winning(file_name) {
    let contents = await retrieve_txt_file(file_name);
    console.log(contents);
    let soul_winning_right_now = contents == 'Something.';
    if (soul_winning_right_now) {
      set_lead_user_btn_disabled(true);
      set_reg_user_btn_disabled(true);
      set_capture_btn_disabled(false);
      set_end_btn_disabled(false);
      // set_use_btn_disabled(false);
    }else{
      set_lead_user_btn_disabled(false);
      set_reg_user_btn_disabled(false);
      set_capture_btn_disabled(true);
      set_end_btn_disabled(true);
      // set_use_btn_disabled(true);
    }
  }
  function go() {
    save_txt_file('running','Something.');
    currently_soul_winning('running');
    set_zoom_level(15);
    set_webview_key(webview_key+1);
    console.log('ID: '+area_ID);
    backgroundLocationsCapture();
    set_capture_btn_disabled(false);
    set_end_btn_disabled(false);
    set_reg_user_btn_disabled(true);
    set_lead_user_btn_disabled(true);
    set_use_btn_disabled(true);
  }
  /////////////////////////////////////////
  function save_details() {
    let info = {
      userId:user_details.id,
      area_ID:area_ID,
      person: person_name,
      phone: phone_number,
      social: social_number,
      state: state,
      receptive: receptive,
      followup: followup,
      single_location: single_location,
    };
    fetch('https://winsouls.co.za/app/interaction/save.php', {
      method: 'post',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then((response)=>response.json()).then((responseJSon)=>{
      // console.log(responseJSon);
      set_area_picks(responseJSon);
    }).catch((error) => {
      console.error(error);
    });
    // console.log('person: '+person_name);
    // console.log('phone number: '+phone_number);
    // console.log('social number: '+social_number);
    // console.log('state: '+state);
    // console.log('receptive: '+receptive);
    // console.log('followup: '+followup);
    // console.log('single_location: '+single_location);
  }
  function enterId() {
    set_area_ID('');
    setModalVisible(true);
  }
  function pickId() {
    set_area_ID('');
    setModalVisible2(true);
    getArea();
  }
  function start_capture() {
    set_person_name('');
    set_phone_number('');
    set_social_number('');
    set_state('');
    set_receptive('');
    set_followup('');
    set_single_location('');
    setModalVisible3(true);
  }
  function confirmInfo() {
    if (true) {
      set_use_btn_disabled(true);
        setConfirmText('Confirm');
        let info = {
          userId:user_details.id,
          coords:JSON.stringify(coordsArr),
          loc:JSON.stringify(captured_locations),
          area_ID:area_ID
        };
      // setModalVisible(true);
      console.log(info);

      fetch('https://winsouls.co.za/app/area/save_coords.php', {
        method: 'post',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      }).then((response)=>response.json()).then((responseJSon)=>{
        console.log(responseJSon);
        if (responseJSon.status==1) {
          set_webview_key(webview_key+1);
          alert('Success: '+responseJSon.msg);
        }else{
          alert(responseJSon.msg);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    else{
      alert('Please fill all fields.');
    }
  }

  function getArea() {
    let info = {
      ID:user_details.id
    };
    fetch('https://winsouls.co.za/app/area/get.php', {
      method: 'post',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then((response)=>response.json()).then((responseJSon)=>{
      // console.log(responseJSon);
      set_area_picks(responseJSon);
    }).catch((error) => {
      console.error(error);
    });
  }
  
  TaskManager.defineTask(CAPTURE_LOCATIONS_TASK, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      let loc = captured_locations;
      let coords = coordsArr;

      let currentTime =  new Date(locations[0].timestamp);
      let hour = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let tempTime = `${makeTwoDigits(hour)}:${makeTwoDigits(minutes)}`;
      let locPrep = {lat:locations[0].coords.latitude,lng:locations[0].coords.longitude,time:tempTime}
      let ltlng = [locations[0].coords.latitude,locations[0].coords.longitude];
      loc.push(locPrep);
      set_captured_locations(loc);
      coords.push(ltlng);
      set_coordsArr(coords);
      set_current_location(ltlng);
    }
  });
  const DATA = [
    // {
    //   id: '1',
    //   title: "Soul Winning",
    //   type: 'label'
    // },
    {
      id: "2",
      title: "Start as Regular",
      style: styles.btn,
      bgColor: 'navy',
      flex: 1,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => enterId(),//backgroundLocationsCapture(),
      btnDisabled: reg_user_btn_disabled
    },{
      id: "3",
      title: "Start as Leader",
      style: styles.btn,
      bgColor: 'navy',
      flex: 1,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => pickId(),//backgroundLocationsCapture(),
      btnDisabled: lead_user_btn_disabled
    },{
      id: "4",
      title: "Capture Interaction",
      style: styles.btn,
      bgColor: 'orange',
      flex: 1,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => start_capture(),//backgroundLocationsCapture(),
      btnDisabled: capture_btn_disabled
    },{
      id: "5",
      title: "End Soul Winning",
      style: styles.btn,
      bgColor: 'red',
      flex: 1,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => stopCapturingBackroundLocations(),
      btnDisabled: end_btn_disabled
    }
    ,{
      id: "15",
      title: "Use Locations",
      style: styles.btn2,
      bgColor: 'maroon',
      flex: 1,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => confirmInfo(),
      btnDisabled: use_btn_disabled
    }
    // ,{
    //   id: "16",
    //   title: "My Map",
    //   type: 'webMap'
    // }
    ,{
      id: '18',
      title: "Modal",
      modalVisible: modalVisible,
      hideModal: () => hideModal(),
      value: area_ID,
      func: set_area_ID,
      go: () => go(),
      type: 'areaId',
    },{
      id: '19',
      title: "Modal2",
      modalVisible: modalVisible2,
      hideModal: () => hideModal2(),
      value: area_ID,
      func: set_area_ID,
      go: () => go(),
      type: 'list_areas',
      title: 'Select Area',
      picks: area_picks 
      //[{id:2,label:'Vlakfontein',value:100},{id:3,label:'Lenasia',value:144}]
    },{
      id: '20',
      title: "Modal3",
      modalVisible: modalVisible3,
      hideModal: () => hideModal3(),
      go: () => save_details(),
      person_name_setter: set_person_name,
      phone_number_setter: set_phone_number,
      social_number_setter:set_social_number,
      state_setter:set_state,
      receptive_setter:set_receptive,
      followup_setter:set_followup,
      coords_setter: set_single_location,
      person_name: person_name,
      phone_number: phone_number,
      social_number:social_number,
      state:state,
      receptive:receptive,
      followup:followup,
      coords: single_location,
      webview_key_setter: set_webview_key,
      webview_key: webview_key,
      type: 'capture_details',
      title: 'Capturing person\'s details'
    },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1,
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // alignItems: 'flex-end',
       width:'100%', marginLeft:'0%', marginTop:'0%',height:'100%' }}>
      <WebView 
      // ref={'Map_Ref'} 
      // source={{ html: html_script }} style={styles.webViewStyle}
      key={webview_key}
      source={{ uri: 'https://winsouls.co.za/app/map/?center='+current_location+'&zoom_level='+zoom_level } } style={styles.webViewStyle}
      >

        </WebView>
        <FlatList
        data={DATA}
        style = {{width:'100%',bottom:'-3%',position:'absolute', zIndex:200 }}
        numColumns = {2}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


export default SW;



const styles = StyleSheet.create({
  webViewStyle: {
    width: '100%',
    height: '100%',
    
  },
  btn:{
      width: '46%',
      // height: 40,
      marginLeft: '2%',
      marginRight: '2%',
      padding: 5,
      textAlign: "center",
      backgroundColor: '#3293a8',
      color: 'white',
      borderRadius: 5,
      // borderWidth: 1,
      // borderRadius: 5,
      marginBottom: 10
  },
  btn2:{
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    padding: 2,
    textAlign: "center",
    backgroundColor: '#3293a8',
    color: 'white',
    // borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30
  }
});