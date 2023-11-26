import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import InviteCard from '../components/InviteCard'
import { FlatList } from 'react-native'
import shareapi from '../api/shareapi'
import MyContext from '../context/context'
import Loader from '../components/Loader'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import NoData from '../components/NoData'


const Invite = () => {
    const {userToken} = useContext(MyContext);
    const [n,setN] = useState(true);
    const [error,setError] = useState('');
    const [listPeers,setListPeers] = useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
              <View style={{flexDirection:'row'}}>
                  <Pressable style={{margin:13}} onPress={() => navigation.navigate('archive')}>
                  <Entypo name="archive" size={24} color="white" />
              </Pressable>     
              </View>
           )
           })
     },[])

    const getInvitations = async() =>{
        try{
        const response = await shareapi.post('invitations/view/',{
            usr_token:userToken,
        });
        console.log(response.data);
        if(response.data.code == 1){
        setListPeers(response.data.res);
        setN(false);  

        }else{
        setError('Network error');
        }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
     getInvitations();
    },[n]);

  return (
   <>
  
        {n ? <Loader msg={error ?  error : 'Loading'} /> : 
       <View style={{margin:10}}>
        
   {
    listPeers && (
     listPeers.length !== 0 ?
       <FlatList
       horizontal
         showsHorizontalScrollIndicator={false} 
        data={listPeers}
        key={item => item.usr_id}
        renderItem={({item}) => {
            return <InviteCard  peer_id={item.usr_id} getInvitations={() => getInvitations()} />
        }}
        />
     : 
     <NoData  msg="No invitations" type='no_data'/>    
    )
    
     }  
    
    </View>    
        }

        
      
 </>
  )
}

export default Invite