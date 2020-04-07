import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import Header from '../components/header';
import Header1 from '../components/header1';
import Header3 from '../components/header3';
import Header2 from '../components/header2';






const screens = {
 
   Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return{
      headerLeft: () => <Header2 navigation={navigation} /> ,
      headerTitle: () => <Header />,

      headerRight: () => <Header1 />,

      headerStyle: {
          backgroundColor:'coral',
      },
  }
  }
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: 'coral'
      }
    }
  },
  };
  const HomeStack = createStackNavigator(screens);
  //export default createAppContainer(HomeStack);
export default HomeStack;
  
