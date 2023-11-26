import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import FormComponent from '../components/FormComponent'
import { styles } from '../styles/styles'
import MyContext from '../context/context'
import { useContext } from 'react'
import shareapi from '../api/shareapi'
import Loader from '../components/Loader'


const Login = () => {
  const {backgroundTheme,showFeedback,setIsLogin,createSecuredKey} = useContext(MyContext);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [n,setN] = useState(true);
  const [msg,setMsg] = useState('Loading...');

  useEffect(()=>{
    setTimeout(() => {
    setN(false);  
    }, 1500);
    
  },[]);

  const processForm  = async(email,pwd) =>{
   
    setMsg('Attempting to login')
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
       const response = await shareapi.post('user/login/',{
        email:email,
        pwd:pwd,
      })
      if(response.data.code == 1){
      createSecuredKey('userTokenKey',response.data.res)
      setIsLogin(true);
      console.log(`token: ${response.data.res}`)
  
      }else{
        //show response msg incase error
        showFeedback(response.data.message);
      }
      //disable loader once response is returned
      if(response){
        setN(false);
      }
  
  }
  return (
    <View style={styles.formContainer}>
      {n ?
      <Loader msg={msg}/>:
       <FormComponent processForm={processForm} formType='login'/>
      }
     
    </View>
  )
}

export default Login;