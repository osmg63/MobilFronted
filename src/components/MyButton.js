import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const MyButton = ({title,onPress}) => {
  return (
    <View tyle={styles.buttonContainer}>
      <Pressable 
            onPress={()=> onPress()}
              style={({pressed})=>[{
                backgroundColor:pressed? "black" : "blue"
              }
              ,styles.button]}>
                
                <Text style={styles.text}>
                  {title}
                </Text>
            
              </Pressable>
    </View>
  )
}

export default MyButton

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'center'
      },
    button: {
        marginTop:3,
        height:50,
        width:340,
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        backgroundColor:'#005fbf'
      },
    text:{
      color:'white',
      fontSize:20
      
    }
})