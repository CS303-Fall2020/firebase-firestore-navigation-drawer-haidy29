import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function Header() {
  return (
    <View>
      <Text style={styles.title}>Todo</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  // header: {
  //   height: 80,
  //   paddingTop: 38,
  //   backgroundColor: 'coral'
  // },
  title:{
     //textAlign: 'center' ,
     color:'#fff',
     fontSize:20,
     fontWeight:'bold',
     marginLeft:50
  }
});
