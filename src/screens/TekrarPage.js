import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

const TekrarPage = ({ navigation, route }) => {
  const { userData, text } = route.params;
  const userId = userData.id;
  console.log(userId);
  console.log("osman");
  console.log(text);

  const [data, setData] = useState([]);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.137.1:8080/api/words/true/${userId}/${text}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Veri getirilirken hata oluştu:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.word}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>{item.terms}</Text>
      </View>
      <View style={styles.definition}>
        {item.meanings && <Text style={styles.text}>• {item.meanings}</Text>}
        {item.meanings2 && <Text style={styles.text}>• {item.meanings2}</Text>}
        {item.meanings3 && <Text style={styles.text}>• {item.meanings3}</Text>}
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const newIndex = currentIndex + 1;
      flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
      setCurrentIndex(newIndex);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
      setCurrentIndex(newIndex);
    } else {
      navigation.goBack(); // İlk öğeye gelindiğinde sayfayı geri git
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>{currentIndex + 1}/{data.length}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: 420, 
          offset: 420 * index,
          index
        })}
      />

      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#aaffff',
  },
  itemContainer: {
    flex: 1,
    width: 415,
    height: '80%',
    marginTop: '5%',
    marginLeft:2,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  stepContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  stepText: {
    fontSize: 25
  },
  word: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B8F2E6',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  definition: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: '#B8F2E6',
  },
  text: {
    fontSize: 27,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20, // Sağ tarafta
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
  },
  
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20, // Sol tarafta
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TekrarPage;
