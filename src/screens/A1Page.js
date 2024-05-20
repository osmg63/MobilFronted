import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';

const A1Page = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const { userData, text } = route.params;
  const userId = userData.id;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.137.1:8080/api/words/${text}/${userId}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Veri getirilirken hata oluştu:', error);
    }
  };

  const handlePress = async (itemId, know) => {
    const requestData = {
      user: { id: userId },
      know,
      word: { id: itemId }
    };

    try {
      const response = await fetch('http://192.168.137.1:8080/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        console.log('Veri başarıyla gönderildi.');
      } else {
        console.error('Veri gönderilirken bir hata oluştu:', response.status);
      }
    } catch (error) {
      console.error('Veri gönderilirken bir hata oluştu:', error);
    }

    handleNext();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.word}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>{item.terms}</Text>
      </View>
      <View style={styles.definition}>
        <Text style={styles.text}>{item.meanings}</Text>
        <Text style={styles.text}>{item.meanings2}</Text>
        <Text style={styles.text}>{item.meanings3}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => handlePress(item.id, true)}>
          <Image
            source={require('../../assets/images/tiks.png')}
            style={{ width: 100, height: 70 }}
          />
        </Pressable>
        <Pressable style={styles.button2} onPress={() => handlePress(item.id, false)}>
          <Image
            source={require('../../assets/images/imagescarpi.png')}
            style={{ width: 100, height: 70 }}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{`${currentIndex + 1} / ${data.length}`}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
      <Pressable style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
  counterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    width: 400,
    height: '80%',
    marginTop: '5%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  word: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#B8F2E6',
  },
  definition: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: '#AED9E0',
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {},
  button2: {
    marginLeft: 50,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#005fbf',
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#005fbf',
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default A1Page;
