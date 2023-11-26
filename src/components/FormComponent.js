import { View, Text } from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import { TextInput,Button } from 'react-native-paper'
import MyContext from '../context/context';
import { styles } from '../styles/styles';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormComponent = ({formType,processForm}) => {
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [pwdVisible,setPwdVisible] = useState(false);
    const {backgroundTheme} = useContext(MyContext);
    const navigation = useNavigation();

    const toggleVisiblePwd = () =>{
        setPwdVisible(!pwdVisible);
    }

   
  return (
    <View>
       <Image source={require('../../assets/pin.png')} style={styles.img}/>
       <Text style={{textAlign:'center',fontSize:20,fontWeight:600}}>ShareMe</Text>
       
      <TextInput 
      placeholder='Email'  
      style={[styles.txtInput]}
       value={email}
       onChangeText={(t) => setEmail(t)}
       activeOutlineColor={backgroundTheme}

      />

       <TextInput 
       placeholder='Password'
       style={styles.txtInput}
       value={pwd}
       secureTextEntry={pwdVisible}
       activeOutlineColor={backgroundTheme}
       right={<TextInput.Icon icon='eye' onPress={() => toggleVisiblePwd()}/>}
       onChangeText={(t) => setPwd(t)}
      />

      <Button
      style={styles.btn}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor={backgroundTheme}
      onPress={() => processForm(email,pwd)}
      >
       {formType == 'login' ? 'Login' : 'Sign up' }
      </Button>


      <Button
      style={[styles.btn,{marginTop:20}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor='black'
      onPress={() => formType == 'login' ? navigation.navigate('register'): navigation.navigate('login')}
      >
       {formType == 'login' ? 'Register instead' : 'Login instead' }
      </Button>


      

    </View>
  )
}

export default FormComponent