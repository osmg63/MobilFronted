import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const A1PageBefore = ({ navigation, route }) => {
  const { userData, text, data } = route.params;
  const dataInt = isNaN(parseInt(data)) ? 0 : parseInt(data);  // data'yı integer'a çevirirken NaN kontrolü

  const onPressOgrenme = () => {
    navigation.navigate('A1Page', { userData: userData, text: text });
  };

  const onPressTest = () => {
    navigation.navigate('Test', { userData: userData, text: text });
  };

  const onPressTekrar = () => {
    navigation.navigate('Tekrar', { userData: userData, text: text });
  };

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <View style={styles.information}>
          <View style={styles.informationBox1}>
            <Text style={styles.informationText}>Bilinen</Text>
            <Text style={styles.informationText}>%{dataInt/50}</Text>
          </View>
          <View style={styles.informationBox2}>
            <Text style={styles.informationText}>Test Sayısı</Text>
            <Text style={styles.informationText}>{userData.testNumber}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Pressable onPress={onPressOgrenme} style={styles.button}>
            <Text style={styles.text}>Öğrenme</Text>
          </Pressable>
          <Pressable onPress={onPressTekrar} style={[styles.button, { marginLeft: 10 }]}>
            <Text style={styles.text}>Tekrar</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={onPressTest} style={styles.button}>
            <Text style={styles.text}>Test</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaffff",
  },
  informationContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  information: {
    flexDirection: 'row',
    marginTop: '25%',
    marginLeft: '3%'
  },
  informationBox1: {
    borderWidth: 0.3,
    width: 200,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#005fbf',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationBox2: {
    alignSelf: 'flex-start',
    width: 100,
    height: 99,
    borderRadius: 12,
    borderWidth: 0.3,
    backgroundColor: '#005fbf',
    marginLeft: '1%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationText: {
    color: 'white',
    fontSize: 16
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "column",
    alignItems: 'center'
  },
  buttonView: {
    borderWidth: 1
  },
  button: {
    height: 75,
    width: 340,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005fbf",
    marginHorizontal: 10,
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default A1PageBefore;
