// import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, TextInput, Alert, FlatList, Image, StyleSheet, TouchableOpacity,
  SafeAreaView } from 'react-native';
function LogoTitle() {
  return (
      <Image
          style={styles.mylogo}
          source={require('../../../img/logo.png')}
      />
  );
}
function HomeScreen({ route, navigation }) {
  const { userDetails } = route.params;
  const DATA = [
    {
      id: '1',
      title: "Regular soul winning",
      type: 'menuCard',
      details: 'Capture details of the people you talk to and their locations.',
      goto: 'SW'
    },{
      id: '2',
      title: "Reggister new area",
      type: 'menuCard',
      details: 'Add new soul winning area to database.',
      goto: 'Register_Area'
    },{
      id: '3',
      title: "Soul winning marathon",
      type: 'menuCard',
      details: 'Register or participate in a soul winning marathon.',
      goto: 'SW_Marathon'
    }
    // ,{
    //   id: '3',
    //   title: "Soul winning marathon: Organize",
    //   type: 'menuCard',
    //   details: 'Register a new soul winning marathon and set the date, times, location details, and other specifics.',
    //   goto: 'SW_Marathon'
    // },{
    //   id: '4',
    //   title: "Soul winning marathon: Participate",
    //   type: 'menuCard',
    //   details: 'Start soul winning at a marathon.',
    //   goto: 'SW_Marathon'
    // }
    ,{
      id: '6',
      title: "Gospel presentations",
      type: 'menuCard',
      details: 'Listen to or watch gospel presentations.',
      goto: 'SW'
    }];
  const renderItem = ({ item }) => {
    const backgroundColor = "#f9c2ff";
    if (item.type=='textbox') {
      return (
        <TextInput placeholder={item.title} 
            onChangeText={ text => item.func(text)}
            style={styles.txt}
            fontSize={16} paddingLeft={5}
        >
          {item.value}
        </TextInput>
      );
    }
    if (item.type=='menuCard') {
      return (
        <View style={styles.menuCard}>
          <Text style={styles.cardHeading}>{item.title}</Text>
          <View style={{flexDirection: 'row', }}>
            <Text style={styles.cardText}>
              {item.details}
            </Text>
            <TouchableOpacity
                      title="MenuCard"
                      onPress={() => navigation.navigate(item.goto,{user_details:userDetails})}
                      style={styles.menuBtn}
            >
              <Text style={styles.imgText}>Let's Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', position: 'relative', width:'100%' }}>
      <View style={{flexDirection: 'row',backgroundColor:'white',height:80,width:'22%',position: 'relative',left:'-20%', top:-25,zIndex: 10,}}>
        <TouchableOpacity
                    title="Profile"
                    onPress={() => navigation.navigate('Profile',{user_details:userDetails})}
                    style={styles.profBtn}
        >
          <Image
              style={styles.mylogo}
              source={require('../../../img/ppic.png')}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={{fontSize:18,fontWeight:'bold',textAlign:'left',width:'90%',marginBottom:20}}>Menu</Text>
      <FlatList
        data={DATA}
        style = {{width:'90%', left: '0%'}}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


export default HomeScreen;

const styles = StyleSheet.create({
  mylogo: {
    // marginVertical: 5,
    // marginHorizontal: 50,
    // borderRadius: 60,
    width: 80,
    height: 80,
    marginRight: 20
  },
  myImgs: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 60,
    width: 170,
    height: 170
  },
  imgText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  menuCard: {
    backgroundColor:'white',width:'100%',height:80, marginBottom: 20
  },
  cardHeading:{
    color:'#3293a8',fontSize:18,fontWeight:'bold',marginBottom:5,marginLeft:8
  },
  profBtn:{
    height:'100%'
  },
  menuBtn:{
    backgroundColor:'#3293a8',height:35,padding:7
  },
  cardText:{
    width:'68%',
    marginLeft: '2%'
  }
});