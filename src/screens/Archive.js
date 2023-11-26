import { View, Text,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import MyContext from '../context/context';
import shareapi from '../api/shareapi';
import { styles } from '../styles/styles';
import Loader from '../components/Loader';
import NoData from '../components/NoData';
import { FlatList } from 'react-native';
import InviteCard from '../components/InviteCard';


const Archive = () => {
    const {userToken} = useContext(MyContext);
    const [n,setN] = useState(true);
    const [error,setError] = useState('');
    const [listPeers,setListPeers] = useState([]);

    const getInvitations = async() =>{
        try{
        const response = await shareapi.post('invitations/view/',{
            usr_token:userToken,
            archived: 'true'
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
        return <InviteCard  peer_id={item.usr_id} getInvitations={() => getInvitations()} archived={true} />
    }}
    />
 : 
 
    <NoData  msg="Nothing here" type='no_data'/> 
  )
 }
  
  </View>  
   
    
    }

    
   </>


  )
}

export default Archive