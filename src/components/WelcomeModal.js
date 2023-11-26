import { View,Image, Pressable} from 'react-native'
import React,{useContext, useState} from 'react'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { styles } from '../styles/styles';
import { AntDesign } from '@expo/vector-icons';
import MyContext from '../context/context';
import { useNavigation } from '@react-navigation/native';


const WelcomeModal = (props) => {


    const {backgroundTheme,visibleModal, setVisibleModal} = useContext(MyContext);
    const navigation = useNavigation();


    // const showModal = () => setVisible(true);
    const hideModal = () => setVisibleModal(false);
    const containerStyle = {backgroundColor: 'white',margin:20,flex:1};

  return (
      <PaperProvider>
      <Portal>
        <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Pressable style={{position:'absolute',right:10,top:10}}
            onPress={() => hideModal()}
            >
            <AntDesign name="close" size={35} color="black" />
            </Pressable>
        <Image source={require('../../assets/welcome.png')} style={{width:250,height:200,alignSelf:'center'}} />
          <Text style={{textAlign:'center',margin:15,fontSize:18}}>
            You currently don't have any peer in your network.</Text>

          <Button
        icon="plus"
        style={[styles.btn,{marginTop:20}]}
        labelStyle={{fontSize:18}}
        textColor='white'
        buttonColor={backgroundTheme}
        onPress={() => {
          navigation.navigate('search');
          hideModal();  
        }
       
         } >
        Add peers
        </Button>

        </Modal>
      </Portal>
      {props.children}
   

    </PaperProvider>
  )
}

export default WelcomeModal