import * as React from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet } from 'react-native';

const MyModal = (props) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => { }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText,{fontWeight:'bold',marginBottom:10}}>Please confirm the information you captured.</Text>
                <Text style={styles.modalText,{marginBottom:15}}>{props.value}</Text>
              </View>
              
              <View style={{flexDirection:'row'}}>
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#ff3b3b', width:'49%',marginRight:'1%' }}
                onPress={() => {
                  props.mSet();
                }}>
                <Text style={styles.textStyle}>Cancel and edit</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#1cd400', width:'49%',marginLeft:'1%' }}
                onPress={() => {
                  props.mSet();props.next();
                }}>
                <Text style={styles.textStyle}>Continue</Text>
              </TouchableHighlight>
              </View>
              
            </View>
          </View>
        </Modal>
      );
};
export default MyModal;

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
      }
})
