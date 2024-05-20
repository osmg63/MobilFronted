import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import axios from 'axios';

const TestPage = ({navigate,route}) => {
  
  const { userData,text } = route.params;
  console.log(text)
  const userId = parseInt(userData.id);
  const [data, setData] = useState([]);
  const [boolean, setBoolean] = useState(true);
  const [selectedMeaning, setSelectedMeaning] = useState("");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  const handleForTest = async (item, index) => {
    try {
      const userData = {
        wordId: data[0], 
        terms: data[1],
        meanings: item,
        id: userId
      };

      const response = await axios.post('http://192.168.137.1:8080/api/words/question', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data===true) {
        setBoolean(response.data);
        setSelectedButtonIndex(index);
        setTimeout(() => setSelectedButtonIndex(-1), 100); // Buton rengini değiştir ve 1 saniye sonra eski haline döndür
        fetchData();
        console.log("kelime doğru")
      } else {
        setBoolean(response.data);
        setSelectedButtonIndex(index);
        setTimeout(() => setSelectedButtonIndex(-1), 100);
        fetchData();
        console.log("kelime yanlış")
      }
    } catch (error) {
      fetchData()
    }
  };
  
  const changeButtonColor = (index) => {
    if(boolean){
      return index === selectedButtonIndex ? styles.selectedButton : null;
    }
    return index === selectedButtonIndex ? styles.selectedButton1 : null;
  };


  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.137.1:8080/api/words/random/${text}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.questionContainer}>
          <Pressable style={styles.buttonQuestion}>
            <Text style={styles.text}>{data.length > 0 ? data[1] : ''}</Text>
          </Pressable>
        </View>
        <View style={styles.answerContainer}>
        {data.slice(2).sort(() => Math.random() - 21).map((item, index) => (
            <Pressable 
              key={index} 
              onPress={() => { 
                setSelectedMeaning(item); 
                handleForTest(item, index);
              }} 
              style={[styles.button, changeButtonColor(index)]}
            >
              <Text style={styles.text}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaffff'
  },
  container1: {
    flex: 5,
    marginTop: '50%'
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  answerContainer: {
    justifyContent: 'flex-start',
  },
  buttonQuestion: {
    width: 380,
    height: 70,
    backgroundColor: '#058e2c',
    backgroundColor: '#0A81D1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#746D75',
    backgroundColor: '#0A81D1',
    height: 60,
    width: 380,
    marginTop: 10,
    marginLeft:12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  selectedButton1: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
