import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import shareapi from "../api/shareapi";

const MyContext = createContext();

export const MyContextProvider = (props) =>{
    const [backgroundTheme,setBackgroundTheme] = useState('#335B9C');
    const [secondaryTheme,setSecondaryTheme] = useState('#e2e3e5');
    const [isLogin,setIsLogin] = useState(false);
    const [userLocationData,setUserLocationData] = useState('');
    const [userToken,setUserToken] = useState('');
    const [locationRequestState,setLocationRequestState] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [permissionError,setPermissionError] = useState('');

   
    //check location permission if true get lat and long
    useEffect(() => {
        (async () => {
            try{
              let { status } = await Location.requestForegroundPermissionsAsync();  
          console.log(status);   
         if (status !== 'granted') {
            setPermissionError('Application requires location permission');
            console.log('No permission')
            return;
          }
        const locationData = await Location.getCurrentPositionAsync({})
        setUserLocationData(locationData);    
            }catch(err){
                console.log(`Error ${err}}`);
            }
        
        })();
      }, []);

    const showFeedback = (msg) =>{
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
    const createSecuredKey = async(key,value) =>{
        try{
        await SecureStore.setItemAsync(key, value);
         setUserToken(value);
       
        
        }catch(err){
        console.log(err);
        }
    }
    const getSecuredKey = async(key) =>{
        try{
        let result = await SecureStore.getItemAsync(key);   
        if(result){
        setUserToken(result);
        setIsLogin(true);
        }else
        {
        //setIsLogin(false);    
        console.log('No user token');   
        }  
        }catch(err){
         console.log(err);
        }
    }

    const deleteSecuredKey = async(key) =>{
        try{
         await SecureStore.deleteItemAsync(key);
        setIsLogin(false);
        setUserToken('');
        }catch(err){
            console.log(err);
        }
    }

  


    useEffect(()=>{
        getSecuredKey('userTokenKey');
     // setUserToken(token);
    },[])
    return(
        <MyContext.Provider
         value={{
            backgroundTheme,secondaryTheme,
            userLocationData,setUserLocationData,
            showFeedback,
            createSecuredKey,locationRequestState,setLocationRequestState
            ,setIsLogin,setUserToken,
            userToken,isLogin,
            deleteSecuredKey,
            visibleModal, setVisibleModal,
            permissionError,setPermissionError


         }}>
           {props.children}
        </MyContext.Provider>
    )
}

export default MyContext;