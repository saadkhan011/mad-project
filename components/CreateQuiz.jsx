import { push, ref, set } from 'firebase/database';
import { database } from "./firebaseconfig";
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
function CreateQuiz({ navigation }) {
  const [quizData, setQuizData] = useState({
    title: '',
    category: '',
    numberOfQuestions: '',
    description: '',
  });

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('my-key'); 
      navigation.navigate('WelcomePage');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };


  const handleInputChange = (field, value) => {
    setQuizData({
      ...quizData,
      [field]: value,
    });
  };

  function writeUserData(title, category, numberOfQuestions, description) {
    const postListRef = ref(database, 'quiz/');
    const newPostRef = push(postListRef);
    const newPostKey = newPostRef.key;
    console.log(newPostKey);

    try {
      set(newPostRef, {
        title,
        category,
        numberOfQuestions,
        description,
      });
      navigation.navigate("AddQuestion", { quizData, newPostKey })
    } catch (error) {
      // Handle the error
      alert('Error writing data to the database:', error.message);
    }
  }


  const handleSubmission = () => {
    // Validate inputs
    if (
      !quizData.title ||
      !quizData.category ||
      !quizData.numberOfQuestions
    ) {
      alert('All fields must be filled out.');
      return;
    }

    const numberOfQuestions = parseInt(quizData.numberOfQuestions, 10);

    // Validate number of questions
    if (isNaN(numberOfQuestions) || numberOfQuestions < 3 || numberOfQuestions > 10) {
      alert('Number of questions must be a valid number between 3 and 10.');
      return;
    }

    // All validations passed, proceed with writing to the database
    writeUserData(quizData.title, quizData.category, quizData.numberOfQuestions, quizData.description);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.buble1}></View>
        <View style={styles.bubleBorder}></View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon name="angle-left" color="#fff" style={styles.icon} onPress={() => navigation.goBack()} />
            <Text onPress={logout} style={[styles.label, { color: "#fff", paddingRight: 20 }]}>Logout</Text>
          </View>
          <Text style={[styles.title, { color: '#fff' }]}>Create Quiz</Text>
        </View>
        <View style={styles.buble2}></View>
        <View style={{ flex: 4, alignItems: 'center' }}>
          <View style={styles.box}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Enter Quiz Title"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={quizData.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />

            {/* Category input */}
            <Text style={styles.label}>Category</Text>
            <TextInput
              placeholder="Enter Quiz Category"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={quizData.category}
              onChangeText={(text) => handleInputChange('category', text)}
            />

            {/* Number of Questions input */}
            <Text style={styles.label}>Number of Questions</Text>
            <TextInput
              placeholder="Enter Number of Question"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="numeric"
              autoCapitalize="none"
              value={quizData.numberOfQuestions}
              onChangeText={(text) => handleInputChange('numberOfQuestions', text)}
            />

            {/* Description input */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Enter Quiz Description"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={quizData.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => handleSubmission()}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#6a5ae0',
  },
  icon: {
    textAlign: 'left',
    fontSize: 23,
    fontWeight: '100',
    paddingLeft: 20,
  },
  input: {
    height: 50,
    borderRadius: 20,
    borderColor: '#999',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
    fontSize: 9,
    backgroundColor: '#fff',
    paddingLeft: 25,
    color: 'black',
  },
  label: {
    fontSize: 10,
    textAlign: 'left',
    color: '#000',
    paddingLeft: 10,
  },
  title: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#6a5ae0',
    padding: 13,
    width: '100%',
    borderRadius: 30,
    marginTop: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#fff',
    marginBottom: 30,
    flex: 3,
    width: '90%',
    padding: 24,
    borderRadius: 30,
  },
  buble1: {
    width: 70,
    top: 50,
    right: 100,
    position: 'absolute',
    height: 70,
    borderRadius: 100,
    backgroundColor: '#796beb',
  },
  buble2: {
    width: 70,
    top: 500,
    left: 100,
    height: 70,
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#796beb',
  },
  bubleBorder: {
    width: 150,
    top: 50,
    position: 'absolute',
    left: 10,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#796beb',
  },
});

export default CreateQuiz;
