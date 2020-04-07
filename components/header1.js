import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import * as firebase from "firebase";

export default function Header() {
  const OnSignOut = () => {
    firebase.auth().signOut();
  }
  return (
    <View >
            <TouchableOpacity onPress={OnSignOut}>

      <Text style={styles.title}>Sign out</Text>
      
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  // header: {
  //   height: 150,
  //   paddingTop: 38,
  //   backgroundColor: 'coral'
  // },
  title:{
     //textAlign: 'center' ,
     color:'#fff',
     fontSize:20,
     fontWeight:'bold',
     marginRight:10,
         textDecorationLine: 'underline',

  }
});
