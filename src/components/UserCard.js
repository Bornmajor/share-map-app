import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import shareapi from '../api/shareapi'
import { Button } from 'react-native-paper'
import MyContext from '../context/context'
import { ActivityIndicator } from 'react-native'

const UserCard = ({usr_id,getPeers}) => {

    const [n,setN] = useState(true);
    const [username,setUsername] = useState('');
    const {userToken,backgroundTheme} = useContext(MyContext);

    const getUserData = async() =>{
        try{
          const response = await shareapi.post('/user/others/',{
            usr_token:userToken,  
            usr_id:usr_id

          });
          console.log(response.data)
          if(response.data.code == 1){
           setN(false);
          setUsername(response.data.res[0].username);  
          }else{
           setN(true);
          
          }
         

        }catch(err){
            console.log(err);        

        }
    }

    const deletePeer = async() =>{
      try{
        const response = await shareapi.post('network/peer/delete/',{
          usr_token:userToken,
          peer_id:usr_id,
        })
        console.log(response.data);

        if(response.data.code == 1){
          getPeers();
        }

      }catch(err){
      console.log(err);
      }
    }

    useEffect(()=>{
        getUserData();
    },[n])
  return (
    <View style={[styles.peerCard,{width:250}]}>

    <View style={{height:150,width:150,borderRadius:150/2,backgroundColor:'#979998'}}></View> 
    {username ? 
     <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:20,margin:10}}>{username}</Text>
     :
     <ActivityIndicator size={30}  color={backgroundTheme} style={{margin:5}}/>
    }
    
    
    <Button
    mode='contained'
    style={[styles.btn]}
    buttonColor={backgroundTheme}
    onPress={() => deletePeer()}
    >
    Remove
    </Button>
    </View>
  )
}

export default UserCard