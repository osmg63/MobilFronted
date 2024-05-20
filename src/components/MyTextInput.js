import { StyleSheet, Text,TextInput, View } from 'react-native'
import React from 'react'

const MyTextInput = ({title,isSecureText,onChangeText,value,placeholder}) => {
  return (
    <View style={styles.containerText}>
        <Text style={[styles.text]}>{title}</Text>
        <TextInput 
        secureTextEntry={isSecureText}
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        /> 
    </View>
  )
}

export default MyTextInput

const styles = StyleSheet.create({
    containerText: {
      container: {
        flex: 1,
        paddingTop:250,
        justifyContent: 'flex-start',
        backgroundColor:'white'
      },
      },
      textInput:{
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width:'90%',
        backgroundColor:'#B8F2E6',
        borderBottomWidth:1,
        color:'#000000'
    
      },
     
      text:{
        paddingTop:1,
        textAlign:'left',
      },
})