import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/components/Login';
import HomeScreen from './app/components/Home';
import Profile from './app/components/Profile';
import SW from './app/components/SW';
import SW_Marathon from './app/components/SW/Marathon';
import Register_Area from './app/components/register_area';
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
    <Stack.Screen name={name} component={comp}  
            options= {{
                headerTitle: <Text style={{color:'white',fontSize:20}}>{logoTitle}</Text>
                ,
              headerRight: () => (
                <View style={{ height: 140, width:'100%',marginBottom: 10, }}>
                  <Image
                      style={styles.mylogo}
                      source={require('./img/logo2.png')}
                  />
                </View>
                ),
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#3293a8',
                  height: 140,
                },
            }}
        />
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" 
          component={Login}
          options={{ 
              headerTransparent: true,
              headerTitle: props => <Text /> 
          }}
        />
        {destination('Home',HomeScreen,'Welcome')}
        {destination('Profile',Profile,'Profile')}
        {destination('Register_Area',Register_Area,'Register Area')}
        {destination('SW',SW,'Soul Winning')}
        {destination('SW_Marathon',SW_Marathon,'SW Marathon')}
      </Stack.Navigator>
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
    marginVertical: 30,
    left: -30,
    width: 130,
    height: 80,
  },
});
