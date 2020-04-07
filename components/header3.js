import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
//import { styles } from '../screens/home';

export default function Header3(){
    const OnSignOut = () => {
        firebase.auth().signOut();
      }
    
    return(
        <View style={styles.header}>

            <Button title="SignOut" color="coral"  onPress={OnSignOut}  style={styles.m}/>
            <Text style={styles.title1}>Profile</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        alignItems:'center',
        height:'100%',
        width: '100%',
        // backgroundColor: 'coral',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginRight:10,
        marginLeft:10,
paddingTop:30
        

    },
    title1: { 
        // textDecorationLine: 'underline',
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 1,
        right: 20,
        marginRight:20

    } ,
    m:{
        left:20,
        marginLeft:10

    }
    
   
})