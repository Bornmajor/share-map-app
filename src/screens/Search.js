import { View, Text ,ScrollView, FlatList} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { styles } from '../styles/styles';
import PeerCard from '../components/PeerCard';
import MyContext from '../context/context';
import shareapi from '../api/shareapi';
import Loader from '../components/Loader';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {backgroundTheme,userToken} = useContext(MyContext);
    const [listUsers,setListUsers] = useState([]);
    const [n,setN] = useState(false);
    const [data,setData] = useState([]);

    const fetchUsers = async() =>{
      //setN(true);
      try{
        const response = await shareapi.post('user/view/',{
          usr_token:userToken,
          all_users:'true'
        })
        setListUsers(response.data.res);
        setN(false);
        console.log(response.data.res)

      }catch(err){
        console.log(err);
      }
    }

    const findUser = () =>{
     const searchValue = searchQuery.toLowerCase();

    const filterdata = listUsers.filter((obj) => {
     return obj.username.toLowerCase().indexOf(searchValue)  !== -1;
    });
    console.log(filterdata)
     setData(filterdata);
    }

    useEffect(()=>{
   fetchUsers();
    },[n]);

   useEffect(()=>{
     findUser();
   },[searchQuery])

  //  const renderItem = useCallback(({item}) => {
  //   return <PeerCard username='osmangaro' peer_id='1'/>
  //  },[])

  return (
    <ScrollView contentContainerStyle={{flex:1,margin:10}}>
      {n ?
      
      <Loader />
      :
      <>
       <Searchbar
      placeholder="Search peer"
      onChangeText={(t) => setSearchQuery(t)}
      value={searchQuery}
     style={[styles.searchbar,{backgroundColor:'#e2e3e5'}]}
     />
     {data ? 
       <FlatList 
     data={data}
     keyExtractor={item => item.usr_id}
     renderItem={({item}) =>{
      return  <PeerCard username={item.username} peer_id={item.usr_id}/>
     }}
     />
     :
    <Text>Type something...</Text>
     }
    

    
     
    
     {/* <PeerCard username='osmangarooooo' usr_id='1'/>  */}

      </>
      
      }

    </ScrollView>
  )
}

export default Search