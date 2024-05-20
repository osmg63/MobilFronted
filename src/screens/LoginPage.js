import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyTextInput, MyButton } from '../components';
import axios from 'axios';

const LoginPage = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const userData = {
        username: username,
        password: password,
      };

      const response = await axios.post('http://192.168.137.1:8080/api/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Başarı");
        console.log(response.data);
        onPress(response.data);  // Pass the user data to the onPress function
      } else {
        console.log(response);
        console.error('Kullanıcı kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
    }
    if (route.params?.password) {
      setPassword(route.params.password);
    }
  }, [route.params]);

  const onPress = (userData) => {
    navigation.navigate('Home', { userData: userData ,password:password});
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.textInputContainer}>
        <MyTextInput
          title=""
          isSecureText={false}
          onChangeText={setUsername}
          value={username}
          placeholder='Kullanıcı Adı'
        />
        <MyTextInput
          title=""
          isSecureText={true}
          onChangeText={setPassword}
          value={password}
          placeholder='Şifre'
        />
        <View style={styles.buttonContainer}>
          <MyButton
            title="Login"
            onPress={handleLogin}
          />
          <MyButton
            title="Sign up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaffff',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  textInputContainer: {
    flex: 2,
    marginLeft: '7%',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '94%',
  },
});
