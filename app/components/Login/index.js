import React, {Component} from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import HomeScreen from 'Welcome.js';
function LogoTitle() {
    return (
        <Image
            style={styles.mylogo}
            source={require('../../../img/logo.png')}
        />
    );
  }
class Login extends Component {
    state = { username: '', password: ''}
    static navigationOptions = { 
        header: null 
    }
    checkLogin(){
        const { username, password } = this.state;
        fetch('https://winsouls.co.za/app/user/login.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
        
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson);
            // If server response message same as Data Matched
            if(responseJson.status === 'Data Matched')
            {
                this.props.navigation.navigate('Home',{userDetails:responseJson});
            }
            else{
                Alert.alert(responseJson);
            }
    
        }).catch((error) => {
            console.error(error);
        });

        // if (username.toLocaleLowerCase().trim()=='test' && password=='1234') {
        //     let responseJson = {full_name:'Tester Number1', cell:'0123456789',id:1};
        //     this.props.navigation.navigate('Home',{userDetails:responseJson});
        // }
    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop:50}}>
                <View style={{ height: 150, width:'100%',marginBottom: 10, }}>
                    <Image
                        style={styles.mylogo}
                        source={require('../../../img/logo2.png')}
                    />
                </View>
                <Text style={styles.heading}>
                    Sign in
                </Text>
                
                {/* <Text style={styles.heading}>Sign In To Your Account</Text> */}
                <TextInput placeholder='Username' 
                    onChangeText={ text => this.setState({ username: text })}
                    style={styles.txt}
                />
                <TextInput placeholder='Password' secureTextEntry={true} 
                    onChangeText={ text => this.setState({ password: text })}
                    style={styles.txt}
                />
                <TouchableOpacity
                    title="Login"
                    onPress={() => this.checkLogin()}
                    style={styles.btn}
                >
                    <Text style={{color:'white',textAlign: 'center', justifyContent: "center",fontSize: 16,}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    title="Register"
                    onPress={() => this.checkLogin()}
                    style={styles.btn2}
                >
                    <Text style={{color:'black',textAlign: 'center', justifyContent: "center",fontSize: 16,}}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}

export default Login;

const styles = StyleSheet.create({
    heading: {
        // marginVertical: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        width: '80%',
        // borderBottomColor: '#3293a8',
        width:'80%',textAlign: "center",
        color:'black',fontWeight: "bold",fontSize: 20,padding: 12,    
        marginBottom: 40,
        marginVertical: 30,
    },
    txt:{
        width: '80%',
        height: 40,
        // borderBottomWidth: '100%',
        textAlign: "center",
        borderBottomColor: "black",
        borderWidth: 1,
        // borderRadius: 5,
        marginBottom: 20
    },
    btn:{
        width: '80%',
        padding: 14,
        textAlign: "center",
        backgroundColor: '#3293a8',
        color: 'white',
        // borderWidth: 1,
        // borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
    },
    btn2:{
        width: '25%',
        padding: 14,
        textAlign: "center",
        // backgroundColor: '#3293a8',
        borderBottomColor: '#3293a8',
        borderBottomWidth: 1,
        color: 'black',
        left: '-25%',
        marginBottom: 10
    },
    mylogo: {
        alignSelf: 'center',
      marginVertical: 10,

      width: '80%',
      height: 180,
    },
  });