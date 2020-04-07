import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    TextInput,
  } from 'react-native';

export default function  Profile({navigation}){
    return(
        <View  style={{paddingTop:50}}>
            <Text style={styles.title1}> Profile</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  
    title1: { 
        // textDecorationLine: 'underline',
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 1,
        right: 20,
        

    } ,
   
   
})