import * as React from 'react';
import { View, Text, TextInput,Modal, TouchableHighlight, FlatList, SafeAreaView  , StyleSheet } from 'react-native';//Picker, 
import {Picker} from '@react-native-community/picker';
import { useState, useEffect } from "react";
import * as Location from 'expo-location';

const Capture_Interaction = (props) => {
    
  const [go_disabled, set_go_disabled] = useState(false);

  

  function confirmInfo() {
    props.mSet();
    props.go();
  }
  function fireOnChange(val) {
    props.person_name_setter(val);
    // useEffect(() => {
    //   let didCancel = false;
      async function fetchMyAPI() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
        let coords = JSON.stringify(location.coords.latitude) + ',' + JSON.stringify(location.coords.longitude);
        props.coords_setter(coords);
      }
  
      fetchMyAPI()
    //   return () => { didCancel = true; }; // Remember if we start fetching something else
    // }, []);
  
  }
    
    const DATA = [
        {
          id: '1',
          title: props.title,
          type: 'label'
        },
        {
          id: "2",
          title: "Person name",
          value: props.person_name,
          style: styles.txt,
          type: 'textbox',
          func: fireOnChange
        },
        {
          id: "3",
          title: "Phone number (optional)",
          value: props.phone_number,
          style: styles.txt,
          type: 'numtextbox',
          func: props.phone_number_setter
        },
        {
          id: "4",
          title: "Social number (optional)",
          value: props.social_number,
          style: styles.txt,
          type: 'numtextbox',
          func: props.social_number_setter
        },
        {
          id: '5',
          title: "State",
          value: props.state,
          style: styles.picker,
          type: 'select',
          func: props.state_setter,
          picks: [{id:1,label:'Saved',value:'Saved'},{id:2,label:'Listened',value:'Listened'}
                    ,{id:3,label:'Interupted',value:'Interupted'}]
        },
        {
          id: '6',
          title: "Receptive?",
          value: props.receptive,
          style: styles.picker,
          type: 'select',
          func: props.receptive_setter,
          picks: [{id:1,label:'Yes',value:true},{id:2,label:'No',value:false}]
        },
        {
          id: '7',
          title: "Followup?",
          value: props.followup,
          style: styles.picker,
          type: 'select',
          func: props.followup_setter,
          picks: [{id:1,label:'Yes',value:true},{id:2,label:'No',value:false}]
        },{
          id: '8',
          title: props.coords,
          type: 'secondary_label'
        }
      ];
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => { }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <SafeAreaView style={{ flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start', width:'95%', marginLeft:'2.5%', marginTop:'5%' }}>
                        <FlatList
                            data={DATA}
                            style = {{width:'90%'}}
                            // numColumns = {2}
                            renderItem={renderItem}
                        />
                    </SafeAreaView>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#ff3b3b', width:'49%',marginRight:'1%' }}
                        onPress={() => {
                            props.mSet();
                        }}>
                        <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        disabled={go_disabled}
                        style={{ ...styles.openButton, backgroundColor: '#1cd400', width:'49%',marginLeft:'1%' }}
                        onPress={() => {
                            confirmInfo();
                        }}>
                        <Text style={styles.textStyle}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
      );
};
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
    if (item.type=='numtextbox') {
        return (
          <TextInput placeholder={item.title} 
            keyboardType='number-pad'
              onChangeText={ text => item.func(text)}
              style={styles.txt}
              // fontSize={16} paddingLeft={5}
          >
            {item.value}
          </TextInput>
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
    if (item.type=='secondary_label') {
      return (
        <View style={{width:'100%',marginBottom:20,flexDirection:'row',position:'relative',zIndex:10}}>
          <Text style={{width:'100%',fontSize:12,fontWeight:'bold',color:'#606066'}}>
            Coordinates: {item.title}
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
      return (
        <TouchableOpacity onPress={item.onPress} style={item.style} disabled={item.btnDisabled}>
          <Text style={item.styleSub}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };
export default Capture_Interaction;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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
    }
})
