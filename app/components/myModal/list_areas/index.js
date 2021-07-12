import * as React from 'react';
import { View, Text, TextInput,Modal, TouchableHighlight, StyleSheet } from 'react-native';//Picker, 
import {Picker} from '@react-native-community/picker';
import { useState, useEffect } from "react";

const ListAreas = (props) => {
  const [go_disabled, set_go_disabled] = useState(true);
  function fireOnChange(pickedVal) {
    props.func(pickedVal);
    
    set_go_disabled(pickedVal=='');
    console.log(go_disabled);
  }
    function my_select (item) {
        var pickersArr = [{id:1,label:item.title,value:''}].concat(item.picks);
        // console.log(pickersArr);
        var pickersList = pickersArr.map(pickerInfo => (
            <Picker.Item style={{textAlign:'center'}} key={pickerInfo.id} label={pickerInfo.label} value={pickerInfo.value}/>
          ));
        return (
          <View style={styles.pickerCont}>
            <Picker
              selectedValue={item.value}
              style={item.style}
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => fireOnChange(itemValue)}//item.func(itemValue)
            >
              {pickersList}
            </Picker>
          </View>
        );
      }
    var selected = {
      title: props.title,
      value: props.val,
      style: styles.txt,
      func: props.func,
      picks: props.picks
    }
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => { }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width:'100%'}}>
                <Text style={styles.modalText,{fontWeight:'bold',marginBottom:10}}>
                  Area:
                </Text>
                {my_select(selected)}
                <Text style={styles.modalText}>Selected area ID: {props.val}</Text>
              </View>
              
              <View style={{flexDirection:'row'}}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#ff3b3b', width:'49%',marginRight:'1%' }}
                  onPress={() => {
                    props.mSet();
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  disabled={go_disabled}
                  style={{ ...styles.openButton, backgroundColor: '#1cd400', width:'49%',marginLeft:'1%' }}
                  onPress={() => {
                    props.mSet();
                    props.start();
                  }}>
                  <Text style={styles.textStyle}>Go</Text>
                </TouchableHighlight>
              </View>
              
            </View>
          </View>
        </Modal>
      );
};
export default ListAreas;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 35,
        // textAlign: 'center',
        width: '100%'
      },
      txt:{
        width: 180,
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
      marginBottom: 30,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'grey'
    },
    picker:{
      width: '100%',
      textAlign: "center",
      alignItems: 'center',
      alignSelf: 'center',
    }
})
