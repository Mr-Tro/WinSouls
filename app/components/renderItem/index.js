import * as React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';//Picker, 
import { useState, useEffect } from "react";
// import {Picker} from '@react-native-picker/picker';
import {Picker} from '@react-native-community/picker';
import MyModal from '../myModal';
import AreaId from '../myModal/areaId';
import ListAreas from '../myModal/list_areas';
import Capture_Interaction from '../myModal/capture_interaction';
const renderItem = ({ item }) => {
    const backgroundColor = "#f9c2ff";
    if (item.type=='textbox') {
      return (
        <TextInput placeholder={item.title} 
            onChangeText={ text => item.func(text)}
            style={styles.txt}
            // fontSize={16} paddingLeft={5}
        >
          {item.value}
        </TextInput>
      );
    }
    if (item.type=='areaId') {
      return (
        <AreaId 
        modalVisible={item.modalVisible} 
        func={item.func} 
        val={item.value} 
        mSet={item.hideModal} 
        start={item.go}
        />
      );
    }
    if (item.type=='list_areas') {
      return (
        <ListAreas 
        modalVisible={item.modalVisible} 
        func={item.func} 
        val={item.value} 
        mSet={item.hideModal} 
        start={item.go}
        title={item.title}
        picks={item.picks}
        />
      );
    }
    if (item.type=='capture_details') {
      return (
        <Capture_Interaction 
        modalVisible={item.modalVisible} 
        mSet={item.hideModal} 
        go={item.go}
        title={item.title}
        person_name_setter={item.person_name_setter}
        phone_number_setter={item.phone_number_setter}
        social_number_setter={item.social_number_setter}
        state_setter={item.state_setter}
        receptive_setter={item.receptive_setter}
        followup_setter={item.followup_setter}
        coords_setter={item.coords_setter}
        person_name={item.person_name}
        phone_number={item.phone_number}
        social_number={item.social_number}
        state={item.state}
        receptive={item.receptive}
        followup={item.followup}
        coords={item.coords}

        webview_key_setter={item.webview_key_setter}
        webview_key={item.webview_key}
        />
      );
    }
    if (item.type=='multiLineTextbox') {
      return (
        <View style={{borderWidth: StyleSheet.hairlineWidth,borderColor:'grey',width:'100%',marginBottom:10}}>
          <TextInput placeholder={item.title} 
            multiline numberOfLines={8} editable maxLength={60}
            onChangeText={ text => item.func(text)}
            style={{height:80}}
            fontSize={16} paddingLeft={5}
          >
            {item.value}
          </TextInput>
        </View>
        
      );
    }
    if (item.type=='label') {
      return (
        <View style={{width:'100%',marginBottom:20,flexDirection:'row',position:'relative',top:-5,zIndex:10}}>
          <View style={{height:32,justifyContent:'center', marginRight:10}}>
            <View style={{width:15,height:15,borderWidth:2,borderColor:'#1fbcc2',borderRadius:7.5,alignItems:'center',justifyContent:'center'}}>
              <View style={{width:9,height:9,backgroundColor:'#1fbcc2',borderRadius:4.5}}>
              </View>
            </View>
          </View>
          
          <Text style={{width:'100%',fontSize:22,fontWeight:'bold',color:'#606066'}}>
            {item.title}
          </Text>
        </View>
        
      );
    }
    if (item.type=='select') {
      var pickersArr = [{id:1,label:item.title,value:''}].concat(item.picks);
      var pickersList = pickersArr.map(pickerInfo => (
          <Picker.Item key={pickerInfo.id} label={pickerInfo.label} value={pickerInfo.value}/>
        ));
      return (
        <View style={styles.pickerCont}>
          <Picker
            selectedValue={item.value}
            style={item.style}
            itemStyle={styles.itemStyle}
            onValueChange={(itemValue, itemIndex) => item.func(itemValue)}
          >
            {pickersList}
          </Picker>
        </View>
      );
    }
    if (item.type=='button') {
      let bgColor = (item.bgColor!==undefined)? item.bgColor:'#3293a8';
      return (
        <TouchableOpacity onPress={item.onPress} style={[item.style,{backgroundColor:bgColor}]} disabled={item.btnDisabled}>
          <Text style={item.styleSub}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };

  export default renderItem;

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
        textAlign: "center",
        borderColor: "grey",
        // fontWeight: 'bold',
        borderWidth: StyleSheet.hairlineWidth,
        // borderRadius: 5,
        marginBottom: 10
    },
    pickerCont:{
      width: '100%',
      textAlign: "center",
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
      width: '46%',
      marginLeft: '2%',
      marginRight: '2%',
      padding: 15,
      textAlign: "center",
      backgroundColor: '#3293a8',
      color: 'white',
      // borderWidth: 1,
      borderRadius: 5,
      marginBottom: 30
    },
    longbtn:{
      width: '96%',
      marginLeft: '2%',
      marginRight: '2%',
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