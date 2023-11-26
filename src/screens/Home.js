import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import MapView from 'react-native-maps';
import { styles } from '../styles/styles';
import * as Location from 'expo-location';
import MyContext from '../context/context';
import { Marker } from 'react-native-maps';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import WelcomeModal from '../components/WelcomeModal';
import shareapi from '../api/shareapi';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const {userLocationData,setUserLocationData,
    backgroundTheme,
    locationRequestState,setLocationRequestState,
    userToken,setIsLogin,
    permissionError,setPermissionError
  } = useContext(MyContext);
 

  const navigation = useNavigation();
  const [n,setN] = useState(true);
  const [listPeers,setListPeers] = useState([]);
  const [error,setErrorMsg] = useState([]);
  const [noPeers,setPeers] = useState('');
  const [reload,setReload] = useState();



   //deacctivate other unactive users after every 10  min
   const deactivateOthersInactive = async () =>{
    try{
      const response = await shareapi.post('deactivate/',{
        usr_token:userToken
      })  
      // console.log(`Deactivate: ${response.data.res}`);
      if(response.data.code == 1){
       getMyPeers();
      }

    }catch(err){
        console.log(err);
    }
    }

  useEffect(()=>{
  setInterval(() => {
    deactivateOthersInactive();
  }, 600000);///after every 10mins deactivate others //600000
  },[userToken])
 

  const getMyPeers = async() =>{
    try{
      const response =  await shareapi.post('location/get/',{
      usr_token: userToken,

      });

      if(response.data.code == 1){
        //console.log(response.data.res);

       setListPeers(response.data.res);
        setN(false);
      }else{
        setN(true);
        //setPermissionError('Network error');
       
      }


    }catch(err){
   console.log(err);
   //setPermissionError('Network error');
    }
  }

  const sendUsersLocation  = async(lat,long) =>{
    try{
      const response = await shareapi.post('location/send/',{
       usr_token: userToken,
       latitude:lat,
       longitude:long
      })
  
      if(response.data.code == 1){ 
      setPeers(response.data.res);
      }

    }catch(err){
      console.log(err)
     
    }
  }

  const hotReload = () =>{
    //reload
    getMyPeers();
    setReload(true);
  }
   
  const getUsersLocation = async() =>{
    try{
      const {coords} = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
     const response = await shareapi.post('location/send/',{
      usr_token:userToken,
      latitude:coords.latitude,
      longitude:coords.longitude
     });
 
     if(response.data.code == 1){
      getMyPeers();
     }

    }catch(err){
     // console.log(err);
    if(err.response.data.res == 'token_expired'){
      console.log('token expired');
      setPermissionError('User token expired login required!!');
    
    }
   

      
    }
  }
 

  useEffect(()=>{
   //get user location after 10 secs
    setInterval(() => {
      getUsersLocation(); 
    }, 10000);
    
  },[userToken],[n])

   useEffect(()=>{
     navigation.setOptions({
      headerLeft:() =>(
        <View style={{flexDirection:'row'}}>
          <Pressable style={{margin:10}} onPress={() => navigation.navigate('menu')}>
         <Feather name="menu" size={25} color="white" />
         </Pressable>
          </View>
      ),
      headerRight:()=>(
        <View style={{flexDirection:'row'}}>

            <Pressable style={{margin:10}} onPress={() => navigation.navigate('search')}>
            <AntDesign name="plus" size={25} color="white" />
        </Pressable>
         
        <Pressable style={{margin:10}} onPress={() => hotReload()}>
         <Ionicons name="reload" size={25} color="white" /> 
        </Pressable>
        

       
    
        </View>
     )
     })
   },[])
  
  useEffect(()=>{
    (async () => {
    try{
    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })
    setUserLocationData(locationData);
    setPermissionError('');
    }catch(err){
      console.log(`Error ${err}}`);
      setPermissionError('Application requires location permission');

    }
    

    const locationSubscription = Location.watchPositionAsync({
      accuracy:5,timeInterval:1000
    }, (location) => {
      sendUsersLocation(location.coords.latitude,location.coords.longitude);
      getMyPeers();
      setUserLocationData(location);
      setLocationRequestState(true);
      console.log('location update')
    });
    return () => locationSubscription.remove(); 
    })()

  },[reload])
  

  // const getCurrentLocationData = async() =>{
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {  
  //     setErrorMsg('Permission to access location was denied');
  //     console.log(status)
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   setUserLocationData(location);  
  //   console.log(location);
  // }

  return (
   
    <>
    {
  
   locationRequestState ? 
    userLocationData ? 
    <WelcomeModal >
      {permissionError && 
      <View style={{padding:10}}>
         <Text style={{fontSize:18}}>{permissionError}</Text> 
      </View>
    
       }
     
       <MapView
       initialRegion={{
        latitude: userLocationData.coords.latitude,
        longitude: userLocationData.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
       }}
        style={styles.map}
  
     >
      {listPeers.map((item,index) => {
        const coords = {
           longitude: parseFloat(item.longitude),
          latitude: parseFloat(item.latitude)
         
        }
        return(
         <Marker 
          key={index}
           title={item.username}
           description={item.last_updated}
          coordinate={coords}
         />   
        )

      })}
      <Marker
       title='Me'
       description={`${userLocationData.coords.latitude},${userLocationData.coords.longitude}`}
       coordinate={userLocationData.coords}
       pinColor={backgroundTheme}
      />
     </MapView>
     </WelcomeModal>
    :
    null
    : <Loader msg={permissionError ? permissionError : 'loading...'} />
    }
    
    </>
   

  )
}

export default Home