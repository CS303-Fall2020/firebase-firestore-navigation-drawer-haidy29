import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeStack1 from './homeStack1';
import ProfileStack from './profileStack';
import Header3 from '../components/header3';
import React from 'react';
const RootDrawerNavigation = createDrawerNavigator({
   
    Todos:{
        screen:HomeStack1
    },
    Profile:{
        screen:ProfileStack,
        navigationOptions: {
            drawerLabel:() => <Header3/>
       }
    },
})

export default createAppContainer(RootDrawerNavigation);
