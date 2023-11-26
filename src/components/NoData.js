import { View, Text,Image } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import MyContext from '../context/context';

const NoData = ({msg,type}) => {
  const navigation = useNavigation();
  const {backgroundTheme} = useContext(MyContext);

  if(type == 'tracking'){
    source =    require('../../assets/tracking.png');
  }else if(type == 'no_data'){
    source = require('../../assets/no_data.png')
  }
  
  return (
    <View style={{alignItems:'center',justifyContent:'center',margin:20}}>
      <Image source={source}  
      style={{width:250,height:250}}/>
       <Text style={{fontSize:20,margin:10,fontWeight:'700'}}>{msg}</Text>

     {type == 'tracking' &&
     <Button
     icon="plus"
      style={[styles.btn,{marginTop:10}]}
      labelStyle={{fontSize:18}}
      textColor='white'
      buttonColor={backgroundTheme}
      onPress={() => navigation.navigate('search')} >
       Add peers
      </Button>
     }
       

    </View>
  )
}

export default NoData