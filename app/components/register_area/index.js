// import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet} from 'react-native';
import { useState, useEffect } from "react";
import renderItem from '../renderItem';

function Register_Area({ route, navigation }) {
  const { user_details } = route.params;
  // console.log(user_details);
  const [area_name, set_area_name] = useState([]);
  const [center_coords, set_center_coords] = useState([]);
  
  const [confirmText, setConfirmText] = useState('');

  /////////////////////////////////////////

  function confirmInfo() {
    if (true) {
        setConfirmText('Confirm');
        let info = {
          ID:user_details.id,
          center_coords:center_coords,
          area_name:area_name
        };
      // setModalVisible(true);
      console.log(info);
      // 
      fetch('https://winsouls.co.za/app/area/create.php', {
        method: 'post',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      }).then((response)=>response.json()).then((responseJSon)=>{
        console.log(responseJSon);
        if (responseJSon.status=1) {
            alert(responseJSon.msg + ' Area ID: '+ responseJSon.areaId);
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

  const DATA = [
    {
      id: "2",
      title: "Area name",
      style: styles.txt,
      type: 'textbox',
      func: set_area_name
    },{
      id: "3",
      title: "Area center coordinates",
      style: styles.txt,
      type: 'textbox',
      func: set_center_coords
    }
    ,{
      id: "15",
      title: "Submit Registration",
      style: styles.btn,
      flex: 2,
      styleSub: {color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,},
      type: 'button',
      onPress: () => confirmInfo(),
    }
  ];
  
  
  return (
    
    <SafeAreaView 
        removeClippedSubviews={false}
        style={{ flex: 1, alignItems: 'center', width:'95%', marginLeft:'2.5%', marginTop:'10%' }}
    >
      <FlatList
        data={DATA}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        style = {{width:'90%'}}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


export default Register_Area;



const styles = StyleSheet.create({
  heading: {
      // marginVertical: 10,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      width: '100%',
      height: 40
  },
  // txt:{
  //     width: '100%',
  //     height: 40,
  //     // borderBottomWidth: '100%',
  //     // textAlign: "center",
  //     borderColor: "grey",
  //     // fontWeight: 'bold',
  //     borderWidth: StyleSheet.hairlineWidth,
  //     // borderRadius: 5,
  //     marginBottom: 10
  // },
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
  }
});