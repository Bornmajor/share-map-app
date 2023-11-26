import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    map:{
        width:'100%',
        height:'100%',
    },
    txtInput:{
        margin:10,
    },
    btn:{
        margin:10
    },
    formContainer:{
    // alignItems:'center',
   justifyContent:'center',
   flex:1
    },
    img:{
    width:'70%',
    height:'30%',
    alignSelf:'center'
    },
    centered:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    },
    circleProfile:{
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor:'#e2e3e5'
    },
    searchbar:{
        margin:10,
    },
    peerCard:{
        // flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#e2e3e5',
        margin:10,
        padding:20,
        borderRadius:10
    },
    approvalStatus:{
     backgroundColor:'#335B9C',
     width:50,
     height:50,
     borderRadius:50/2,
     alignItems:'center',
     justifyContent:'center',
     margin:10
    }
    
})

export {styles}