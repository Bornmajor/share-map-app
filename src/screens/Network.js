import { View, Text, FlatList,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import shareapi from '../api/shareapi'
import MyContext from '../context/context'
import Loader from '../components/Loader'
import PeerCard from '../components/PeerCard'
import NoData from '../components/NoData'
import UserCard from '../components/UserCard'

const Network = () => {
  const {userToken} = useContext(MyContext);
  const [n,setN] = useState(true);
  const [listPeers,setListPeers] = useState([]);
  const [error,setErrorMsg] = useState('')

 const getPeers = async() =>{
    try{
    const response = await shareapi.post('network/peer/view/',{
      usr_token:userToken,
      status: 'approved'
    });
    console.log(response.data)

    if(response.data.code == 1){
    setListPeers(response.data.res);
    setN(false);
    }

    }catch(err){
     setErrorMsg('Network error');
     console.log(err);
    }
 }

 useEffect(()=>{
  getPeers();
 },[n])

   return (
    <>
   


      {n ?
      <Loader msg={error? error : 'loading..'}/>
      : 
    <View style={{margin:10}}>  
    {
      listPeers && (
       listPeers.length !== 0 ?
       <FlatList
       horizontal
         showsHorizontalScrollIndicator={false} 
        data={listPeers}
        key={item => item.peer_id}
        renderItem={({item}) => {
            return <UserCard usr_id={item.peer_id} getPeers={() => getPeers()}/>
        }}
        />
     :   
     <NoData type='tracking' msg="No Peers"/>  
      )
    
     }
      </View>
      }
     
   
     </>
  )
}

export default Network