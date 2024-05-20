import { Pressable, StyleSheet, Text, TextInput, Image, View, SafeAreaView } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { MyButton, MyTextInput } from '../components';
import { sendNotification } from '../service/NotificationService';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userData = {
        name: name,
        username: username,
        password: password,
        lastName: lastname,
      };

      const response = await axios.post('http://192.168.137.1:8080/api/create', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Başarı");
        navigation.navigate('Login', { username: username, password: password });
        sendNotification(name);
      } else {
        console.log(response);
        console.error('Kullanıcı kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>
        <MyTextInput 
          title=""
          isSecureText={false}
          onChangeText={setName}
          value={name}
          placeholder='Name'
        />
        <MyTextInput
          title=""
          isSecureText={false}
          onChangeText={setLastname}
          value={lastname}
          placeholder='Lastname'
        />
        <MyTextInput
          title=""
          isSecureText={false}
          onChangeText={setUsername}
          value={username}
          placeholder='Username'
        />
        <MyTextInput
          title=""
          isSecureText={true}
          onChangeText={setPassword}
          value={password}
          placeholder='Password'
        />
        <View style={styles.button}>
          <MyButton onPress={handleSignUp} title="Sign Up" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#aaffff',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '10%',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    width: '94%',
  },
});
