import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { styles } from '../styles/styles'
import { Button } from 'react-native-paper'
import MyContext from '../context/context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import shareapi from '../api/shareapi'
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader'

const Menu = () => {
    const { deleteSecuredKey,backgroundTheme,userToken} = useContext(MyContext);
    const navigation = useNavigation();
    const [username,setUsername] = useState('');
    const [n,setN] = useState(true);

    const fetchUserProfileData = async( ) =>{
      try{
      const response = await shareapi.post('user/view/',{
        usr_token:userToken,
      })
      setN(false)
      setUsername(response.data.res[0].username);
      
      }catch(err){

      }
    }
    useEffect(()=>{
    fetchUserProfileData();
    },[])

  return (
    <View style={styles.centered}>
   
      <View style={{margin:20}}>
        <View style={styles.circleProfile}></View>
        {username ?
        <Text style={{fontSize:20,textAlign:'center'}}>
          <FontAwesome name="user-circle" size={24} color="black" />  {username}
        
          </Text> 
        : 
        <ActivityIndicator size={30} color={backgroundTheme}/>
        }
         
      </View>

      <Button
    
      style={[styles.btn,{marginTop:10}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor={backgroundTheme}
      onPress={() => navigation.navigate('network')} >
       My network
      </Button>

    <Button
     icon="plus"
      style={[styles.btn,{marginTop:10}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor={backgroundTheme}
      onPress={() => navigation.navigate('search')} >
       Add peers
      </Button>

      <Button
      style={[styles.btn,{marginTop:10}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor={backgroundTheme}
      onPress={() => navigation.navigate('invite') } >
      Invitations
      </Button>


      <Button
      style={[styles.btn,{marginTop:10}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor='black'
      onPress={() => deleteSecuredKey('userTokenKey')} >
        Logout
      </Button>

     
     
     
    

    

   
    </View>
  )
}

export default Menu