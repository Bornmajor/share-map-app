import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Menu from '../screens/Menu';
import Search from '../screens/Search';
import Invite from '../screens/Invite';
import Archive from '../screens/Archive';
import Network from '../screens/Network';
import { useContext } from 'react';
import MyContext from '../context/context';
import { NavigationContainer } from '@react-navigation/native';

const StackNav = () => {
    const Stack = createStackNavigator();
    const {backgroundTheme,isLogin} = useContext(MyContext)
  return (
    <NavigationContainer>
     <Stack.Navigator 
    screenOptions={{
      headerStyle:{backgroundColor:backgroundTheme},
      headerTintColor:'white'
  }}
  initialRouteName='home'
    >
      {isLogin ? 
      <>
         <Stack.Screen
        name='home'
        component={Home}
        options={{
          title:'Share my location app'
        }}
        />
           <Stack.Screen
        name='menu'
        component={Menu}
        options={{
          title:'Menu'
        }}
        />
             <Stack.Screen
        name='search'
        component={Search}
        options={{
          title:'Search for peers'
        }}
        />
             <Stack.Screen
        name='invite'
        component={Invite}
        options={{
          title:'Invitations'
        }}
        />
            <Stack.Screen
        name='archive'
        component={Archive}
        options={{
          title:'Archived invitations'
        }}
        />
           <Stack.Screen
        name='network'
        component={Network}
        options={{
          title:'My network'
        }}
        />

      </>
     :
     <>
       <Stack.Screen 
     name='login'
     component={Login}
     options={{
       title:'Account login'
     }}
     />

     <Stack.Screen 
     name='register'
     component={Register}
     options={{
       title:'Create account'
     }}
      />
     </>
   
    }
     
      
       

    </Stack.Navigator>  
    </NavigationContainer>
   
  )
}

export default StackNav