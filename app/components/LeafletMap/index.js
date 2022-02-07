import * as React from 'react';
import { SafeAreaView, View, Text, Modal, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';//Picker, 
import { WebView } from 'react-native-webview';

// const myMap () => {
//     return ()
// };
function myMap() {
    return (
    
        <SafeAreaView style={{ flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start', width:'100%', marginLeft:'0%', marginTop:'0%' }}>
          <WebView source={{ uri: 'https://winsouls.co.za/app/map/' }} style={styles.webViewStyle}/>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    webViewStyle: {
        width: '100%',
        height: '100%'
    }
});

export default myMap;