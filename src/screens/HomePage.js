import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const HomePage = ({ navigation, route }) => {
  const [data, setData] = useState();


  const { userData } = route.params;
  const userId=userData.id;
  const onPress = (text) => {
    navigation.navigate('A1PageBefore', { userData: userData, text: text,data:data });
  };
  const onPressKelime = (text) => {
    navigation.navigate('Full', { userData: userData});
  };



  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.137.1:8080/transaction/${userId}`);
      const jsonData = await response.json();
      setData(jsonData);
      //console.log(data); // data yerine jsonData yazdım
    } catch (error) {
      console.error('Veri getirilirken hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <View style={styles.containerText2}>
          <Text style={styles.text1}>Bilinen Kelime</Text>
          <View style={styles.containerText1}>
            <Text style={styles.text}>{data}</Text>
          </View>
        </View>
        <View style={styles.containerText2}>
          <Text style={styles.text1}>Puan</Text>
          <View style={styles.containerText1}>
            <Text style={styles.text}>{userData.point}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerButton}>
        <View style={styles.row}>
          <Pressable onPress={() => onPress('A1')} style={styles.button}>
            <Text style={styles.text}>A1</Text>
          </Pressable>
          <Pressable onPress={() => onPress('A2')} style={styles.button}>
            <Text style={styles.text}>A2</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable onPress={() => onPress('B1')} style={styles.button}>
            <Text style={styles.text}>B1</Text>
          </Pressable>
          <Pressable onPress={() => onPress('B2')} style={styles.button}>
            <Text style={styles.text}>B2</Text>
          </Pressable>
        </View>
        <View style={styles.row1}>
          <Pressable onPress={() => onPress('C1')} style={styles.button1}>
            <Text style={styles.text}>C1</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable onPress={() => onPressKelime('Kelimelerim')} style={styles.button1}>
            <Text style={styles.text}>Kelimelerim</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#aaffff'
  },
  containerText: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerText2: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text1: {
    color: 'black',
    fontSize: 20,
  },
  containerText1: {
    width: 100,
    height: 100,
    borderRadius: 200,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c6dce'
  },
  containerButton: {
    flex: 6,
  },
  row: {
    flexDirection: 'row',
    marginTop: 25,
  },
  row1: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    height: 75,
    width: 150,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005fbf',
    marginHorizontal: 25,
  },
  button1: {
    height: 75,
    width: 350,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005fbf',
    marginTop: '5%',
    marginHorizontal: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
