import { StyleSheet,ActivityIndicator, Text, View, Pressable } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View style={[styles.container]}>
       
      <Pressable 
      onPress={()=>props.changeIsLoading()}
        style={[styles.button]}>    
        <Text style={styles.closeButton}>X</Text>
      </Pressable>
        
      
      <ActivityIndicator   
        size={'large'}
        color={'gray'}/>
      <Text style={styles.loginText}>Loading..</Text>   
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'141%',
        backgroundColor:'white',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#d7e858'
    },
    button:{
      width:15,
      height:20,
       position:'absolute',
       top:50,
       right:30
    },
    loginText:{
        marginTop:5,
        marginLeft:10,
        fontWeight:'bold'
    },
    closeButton:{
      justifyContent:'center',
      alignContent:'center',
      fontWeight:'bold',
      fontSize:15

    }
})

