import * as React from 'react';
import { View, Text, TextInput,Modal, TouchableHighlight, FlatList, SafeAreaView  , StyleSheet } from 'react-native';//Picker, 
import { useState, useEffect } from "react";

const Register_User = (props) => {
    
  const [go_disabled, set_go_disabled] = useState(true);
  function confirmInfo() {
    props.mSet();
    props.go();
    props.webview_key_setter(props.webview_key+1);
  }
  function fireOnChange(val) {
    props.phone_number_setter(val);
    (props.phone_number.trim()==='' || props.first_name.trim()==='' || props.last_name.trim()==='')? 
    set_go_disabled(true):set_go_disabled(false);
  }
    
    const DATA = [
        {
          id: '1',
          title: props.title,
          type: 'label'
        },
        {
          id: "2",
          title: "First name",
          value: props.first_name,
          style: styles.txt,
          type: 'textbox',
          func: props.first_name_setter
        },
        {
          id: "3",
          title: "Last name",
          value: props.last_name,
          style: styles.txt,
          type: 'textbox',
          func: props.last_name_setter
        },
        {
          id: "4",
          title: "Phone number (required)",
          value: props.phone_number,
          style: styles.txt,
          type: 'numtextbox',
          func: fireOnChange
        }
        ,{
          id: "5",
          title: "Save Details",
          style: styles.openButton,
          flex: 2,
          styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
          type: 'button',
          onPress: () => confirmInfo(),
          btnDisabled: go_disabled,
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
                    <SafeAreaView style={{ 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start', width:'95%', marginLeft:'2.5%', marginTop:'5%', }}>
                        <FlatList
                            data={DATA}
                            style = {{width:'90%'}}
                            // numColumns = {2}
                            renderItem={renderItem}
                        />
                    </SafeAreaView>
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
    if (item.type=='button') {
      return (
        <TouchableHighlight onPress={item.onPress} style={item.style} disabled={item.btnDisabled}>
          <Text style={item.styleSub}>{item.title}</Text>
        </TouchableHighlight>
      );
    }
  };
export default Register_User;

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
        backgroundColor: '#1cd400',//'#F194FF'
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
    btn:{
      width: '100%',
      padding: 15,
      textAlign: "center",
      backgroundColor: '#1cd400',//'#3293a8',
      color: 'white',
      // borderWidth: 1,
      borderRadius: 5,
      marginBottom: 30
  }
})
