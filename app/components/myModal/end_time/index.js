import * as React from 'react';
import { View, Text, TextInput,Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";

const EndTime = (props) => {
  const [send_disabled, set_send_disabled] = useState(true);
  function fireOnChange(Val) {
    props.func(Val);
    
    set_send_disabled(Val=='');
    console.log(send_disabled);
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
                  Thank you for doing soul winning.
                </Text>
                <Text style={styles.modalText,{marginBottom:8,color:'green'}}>
                  NB! Enter message and press 'Send' to save all gathered location data.
                </Text>
                <Text style={styles.modalText,{marginBottom:8,color:'red'}}>
                  NB! Pressing 'Discard' will throw away all gathered location data.
                </Text>
                {/* <Text style={styles.modalText,{marginBottom:15}}>{props.value}</Text> */}
                <TextInput placeholder='How was it?' 
                    onChangeText={ text => fireOnChange(text)}
                    style={styles.txt}
                    fontSize={16} paddingLeft={5}
                >
                {props.val}
                </TextInput>
              </View>
              
              <View style={{flexDirection:'row'}}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#ff3b3b', width:'49%',marginRight:'1%' }}
                  onPress={() => {
                    props.mSet();
                  }}>
                  <Text style={styles.textStyle}>Discard</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  disabled={send_disabled}
                  style={{ ...styles.openButton, backgroundColor: '#1cd400', width:'49%',marginLeft:'1%' }}
                  onPress={() => {
                    props.mSet();
                    props.send();
                  }}>
                  <Text style={styles.textStyle}>Send</Text>
                </TouchableHighlight>
              </View>
              
            </View>
          </View>
        </Modal>
      );
};
export default EndTime;

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
        marginBottom: 15,
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
        marginBottom: 30
    }
})
