import { View, Text,Image } from 'react-native'
import React, { useContext } from 'react'
import { styles } from '../styles/styles'
import { ActivityIndicator } from 'react-native'
import MyContext from '../context/context'
import NetInfo from '@react-native-community/netinfo';
import { useState,useEffect } from 'react'

const Loader = ({msg}) => {
    const {backgroundTheme} = useContext(MyContext);
    const [netState,setNetState] = useState('');

    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
            //runs anytime there network change
           // console.log('Connection type', state.type);
           // console.log('Is connected?', state.isConnected);
            if(state.isConnected == false || state.isInternetReachable == false){
             setNetState('No internet');
            }else{
             setNetState('');
            }
            // process();
          console.log(state.isInternetReachable)
        });
        },[])

  return (
    <View style={styles.centered}>
       <Image source={require('../../assets/pin.png')} style={styles.img}/>
        <ActivityIndicator color={backgroundTheme} size='60'/>
        <Text>{netState}</Text>
        {msg ? <Text style={{color:'#353839'}}>{msg}</Text> : null}
       
    </View>
  )
}

export default Loader