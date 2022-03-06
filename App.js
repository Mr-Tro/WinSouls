import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/components/Login';
import HomeScreen from './app/components/Home';
import Profile from './app/components/Profile';
import SW from './app/components/SW';
import SW_Marathon from './app/components/SW/Marathon';
import Register_Area from './app/components/register_area';

import { createDrawerNavigator } from '@react-navigation/drawer';
//cd documents/reactnativestuff/winsouls

function LogoTitle() {
  return (
      <Image
          style={styles.mylogo}
          source={require('./img/logo2.png')}
      />
  );
}
function LogoTitle1() {
  return (
      <Text style={{color:'white',fontSize:20}}>Welcome</Text>
  );
}
function destination(name,comp,logoTitle) {
  return (
    <Drawer.Screen name={name} component={comp}  
            options= {{
              drawerLabel: logoTitle
                ,
              headerRight: () => (
                <View style={{ height: 100, width:'100%',marginBottom: 10, }}>
                  <Image
                      style={styles.mylogo}
                      source={require('./img/logo2.png')}
                  />
                </View>
                ),
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#3293a8',
                  height: 100,
                },
            }}
        />
  );
}
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Soul Winning'>{/* Login */}
        {/* <Drawer.Screen name="Login" 
          component={Login}
          // options={{ 
          //     headerTransparent: true,
          //     headerTitle: props => <Text /> 
          // }}
        /> */}
        {/* {destination('Home',HomeScreen,'Welcome')} */}
        {/* {destination('Profile',Profile,'Profile')} */}
        {destination('Register New Area',Register_Area,'Register New Area')}
        {destination('Soul Winning',SW,'Soul Winning')}
        {destination('Soul Winning Marathon',SW_Marathon,'Soul Winning Marathon')}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mylogo: {
    alignSelf: 'center',
    marginVertical: 20,
    left: -10,
    width: 80,
    height: 50,
  },
});
