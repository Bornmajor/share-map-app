import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import FormComponent from '../components/FormComponent'
import { useContext } from 'react'
import MyContext from '../context/context'
import shareapi from '../api/shareapi'
import Loader from '../components/Loader'

const Register = () => {
  const {
    backgroundTheme,showFeedback,
    setIsLogin,createSecuredKey,
    userLocationData,
    setVisibleModal
  }
     = useContext(MyContext);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [n,setN] = useState(false);
  const [msg,setMsg] = useState('Loading...');





  const processForm  = async(email,pwd) =>{
  
    setMsg('Creating account...');
    //validation email and pwd
    if(email == '' || email == ' '){
     showFeedback('Email address required')
     return false;
    }else if(pwd == '' || pwd == ' '){
     showFeedback('Password required');
     return false;
    }else if(!emailRegex.test(email)){
     showFeedback('Email not valid');
     return false;
    }
  setN(true);


   const response = await shareapi.post('user/registration/',{
      email:email,
      pwd:pwd,
      longitude: userLocationData.coords.longitude,
      latitude:userLocationData.coords.latitude
    })

   
    if(response.data.code == 1){
     
    createSecuredKey('userTokenKey',response.data.res)
    setIsLogin(true);
    setVisibleModal(true);
    console.log(`token: ${response.data.res}`)

    }else{
      //show response msg incase error
      showFeedback(response.data.message);
    }
    //disable loader once response is returned
    if(response){
      setN(false);
    }
    //console.log(`${email},${pwd}`);
}
  return (
    <View style={styles.formContainer}>
      { n ? 
       <Loader msg={msg}/> 
      :
       <FormComponent processForm={processForm} formType='register'/> 
       }
    
    </View>
  )
}

export default Register