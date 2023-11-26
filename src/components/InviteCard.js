import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import { AntDesign } from '@expo/vector-icons';
import MyContext from '../context/context';
import { Button } from 'react-native-paper';
import { Pressable } from 'react-native';
import shareapi from '../api/shareapi';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const InviteCard = ({peer_id,getInvitations,archived}) => {
    const {backgroundTheme,secondaryTheme,userToken} = useContext(MyContext);
    const [username,setUsername] = useState('');
    const [n,setN] = useState(true);
    const navigation = useNavigation();

  
   

    const getUserData = async() =>{
        try{
          const response = await shareapi.post('/user/others/',{
            usr_token:userToken,  
            usr_id:peer_id 

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

    const acceptInvitation = async() =>{
        try{
        const response  = await shareapi.post('network/peer/approve/',{
            usr_token:userToken,
            peer_id:peer_id
        })
        if(response.data.code == 1){
             getInvitations();

        }

        }catch(err){

        }
    }

    const archiveInvitation = async() =>{

        try{
        const response = await shareapi.post('network/peer/archive/',{
            usr_token:userToken,
            peer_id:peer_id
        })
        if(response.data.code == 1){
        
            getInvitations();  

        }
        }catch(err){
        
        }
    }

    useEffect(()=>{
     getUserData();
    },[n]);

  return (
    <View style={styles.peerCard}>

     <View style={{height:130,width:130,borderRadius:130/2,backgroundColor:'#979998'}}></View> 

       {username ?
        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:20,margin:10}}>{username}</Text>
       : 
       <ActivityIndicator size={30}  color={backgroundTheme} style={{margin:5}}/>
       }
       

    

     <View style={{flexDirection:'row'}}>


        <Pressable style={styles.approvalStatus} onPress={
            () => acceptInvitation()}>
        <AntDesign name="check" size={25} color="white" /> 
        </Pressable>

        {!archived && 
        <Pressable style={styles.approvalStatus} onPress={() => archiveInvitation()}>
        <AntDesign name="close" size={25} color="white" />
        </Pressable>
        }
       


     </View>

    </View>
  )
}

export default InviteCard