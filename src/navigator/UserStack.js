import React from 'react'
import { A1Page, HomePage, LoginPage, RegisterPage, TekrarPage, TestPage } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import A1PageBefore from '../screens/A1PageBefore';
import FullTekrar from '../screens/FullTekrar';

const Stack= createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name='Login' component={LoginPage}/>
       <Stack.Screen name='Tekrar' component={TekrarPage}/>
       <Stack.Screen name='Test' component={TestPage}/>
        <Stack.Screen name='Home' component={HomePage}/>
        <Stack.Screen name='A1Page'   component={A1Page}/>
        <Stack.Screen name='A1PageBefore'   component={A1PageBefore}/>
        <Stack.Screen name='SignUp' component={RegisterPage}/>
        <Stack.Screen name='Full' component={FullTekrar}/>

        
    </Stack.Navigator>
    
  )
}

export default UserStack

