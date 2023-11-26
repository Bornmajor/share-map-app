import { View, Text,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import shareapi from '../api/shareapi';
import MyContext from '../context/context';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PeerCard = ({username,peer_id,screenType}) => {
  const {userToken,showFeedback,backgroundTheme} = useContext(MyContext);
  const [status,setStatus] = useState('');
  const [n,setN] = useState('')
  const navigation = useNavigation();
  const [userId,setUserId] = useState('');
  //send add request
  const requestAddPeer = async() =>{
    try{
      const response = await shareapi.post('network/peer/add/',{
       usr_token:userToken,
       peer_id:peer_id,
      })
      
      console.log(response.data)
      if(response.data.code == 1){
        //render card
        checkPeerStatus();
      }else{
        showFeedback('Something went wrong!!Try later')
      }

    }catch(err){
       console.log(err);
    }
  }

  const checkPeerStatus = async() =>{
    setStatus('');
    try{
    const response = await shareapi.post('network/peer/status/',{
      usr_token:userToken,
      peer_id:peer_id
    });
    if(response.data.code == 1){
    setStatus(response.data.res);
    // setN('ok');  
    }

    }catch(err){

    }
  }
  
  const fetchUser = async() =>{
    //setN(true);
    try{
      const response = await shareapi.post('user/view/',{
        usr_token:userToken,
      })
      if(response.data.code == 1){
      setUserId(response.data.res[0].usr_id);
    //  setUsername()
      setN(false); 
      }
     
 

    }catch(err){
      console.log(err);
    }
  }

  const deletePeer = async() =>{
    try{
      const response = await shareapi.post('network/peer/delete/',{
        usr_token:userToken,
        peer_id:peer_id,
      })
      console.log(response.data);

      if(response.data.code == 1){
        checkPeerStatus();
      }

    }catch(err){
    console.log(err);
    }
  }

  useEffect(()=>{
   fetchUser(); 
  checkPeerStatus();
  },[]);

  return (
    <View style={styles.peerCard}>
       <View style={{height:150,width:150,borderRadius:150/2,backgroundColor:'#979998'}}></View> 


         {username ?
         <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:20,margin:10}}>{username}</Text>
          : 
        <ActivityIndicator size={30}  color={backgroundTheme} style={{margin:5}}/>
         }
     
       
       {userId == peer_id ?
       <Button 
      buttonColor={backgroundTheme}
       style={[styles.btn]}
       mode='contained'
       disabled={true}>
        Me
       </Button> :
       
       status ? 
         <Button 
        buttonColor={backgroundTheme} 
      // icon={status == 'unavailable' ?'plus' : 'timer-sand'}
      mode='contained'
       style={[styles.btn]}
      onPress={() => status == 'unavailable' ?  requestAddPeer() : deletePeer() }>
        {
          screenType == 'network' ? 
          'Remove'
          :

        status == 'exist'? 'Remove'
        
        :
        status == 'unavailable'  ? 'Send request':'Waiting for approval'
        }
      </Button>
        : <ActivityIndicator size={30}  color={backgroundTheme} style={{margin:5}}/>
       

       }
     
      
   
       
    </View>
  )
}

export default PeerCard