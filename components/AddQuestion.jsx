import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { update, ref } from 'firebase/database';
import { database } from "./firebaseconfig";
function AddQuestion({ navigation }) {
  const route = useRoute();
  const { quizData, newPostKey } = route.params;
  const [count, setCount] = useState(1);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmission = () => {
    if (!formData?.question || !formData?.answer || !formData?.option1 || !formData?.option2) {
      alert('Make sure you have filled answer, question and more than one option.');
      // Optionally, you can show an alert or update the UI to indicate the error.
      return;
    }
    const lowerCaseAnswer = formData?.answer.toLowerCase();
    const lowerCaseOption1 = formData?.option1.toLowerCase();
    const lowerCaseOption2 = formData?.option2.toLowerCase();
    const lowerCaseOption3 = formData?.option3.toLowerCase();
    const lowerCaseOption4 = formData?.option4.toLowerCase();

    // Check if answer is present in the options
    if (![lowerCaseOption1, lowerCaseOption2, lowerCaseOption3, lowerCaseOption4].includes(lowerCaseAnswer)) {
      alert('Answer must be one of the provided options.');
      // Optionally, you can show an alert or update the UI to indicate the error.
      return;
    }
    // save data in database
    const postRef = ref(database, `quiz/${newPostKey}/question${count}`);
    setCount((prevCount) => prevCount + 1);
    try {
      update(postRef, formData);
      console.log('Data successfully updated in the database!');
    } catch (error) {
      console.error('Error updating data in the database:', error.message);
    }
    if (count < quizData.numberOfQuestions) {
      setFormData({
        question: '',
        answer: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
      });
    }
    else {
      navigation.navigate('Congratulation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.buble1}></View>
        <View style={styles.bubleBorder}></View>
        <View style={{ flex: 3, flexDirection: "row", padding: 15, }}>
          <Text style={[styles.title, { color: '#fff', flex: 2 }]}>{quizData?.title}</Text>
        </View>
        <View style={styles.buble2}></View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.box}>
            <Text style={styles.smallText}>{quizData.numberOfQuestions} / {count}</Text>
            <Text style={styles.label}>Question</Text>
            <TextInput
              placeholder="Enter Your Question"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.question}
              onChangeText={(text) => handleInputChange('question', text)}
            />

            {/* Answer input */}
            <Text style={styles.label}>Answer</Text>
            <TextInput
              placeholder="Enter The Answer"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.answer}
              onChangeText={(text) => handleInputChange('answer', text)}
            />

            <Text style={styles.label}>Option # 1</Text>
            <TextInput
              placeholder="Enter 1st option"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.option1}
              onChangeText={(text) => handleInputChange('option1', text)}
            />
            <Text style={styles.label}>Option # 2</Text>
            <TextInput
              placeholder="Enter 2nd option"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.option2}
              onChangeText={(text) => handleInputChange('option2', text)}
            />
            <Text style={styles.label}>Option # 3</Text>
            <TextInput
              placeholder="Enter 3rd option"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.option3}
              onChangeText={(text) => handleInputChange('option3', text)}
            />
            <Text style={styles.label}>Option # 4</Text>
            <TextInput
              placeholder="Enter 4th option"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.option4}
              onChangeText={(text) => handleInputChange('option4', text)}
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
    fontSize: 23,
    fontWeight: '100',
  },
  input: {
    height: 50,
    borderRadius: 20,
    borderColor: '#999',
    borderWidth: 1,
    color: 'black',
    width: '100%',
    marginVertical: 10,
    fontSize: 9,
    backgroundColor: '#fff',
    paddingLeft: 25,
  },
  label: {
    fontSize: 10,
    textAlign: 'left',
    color: '#000',
    paddingLeft: 10,
  },
  smallText: {
    fontSize: 8,
    textAlign: 'center',
    paddingTop: 20,
    color: "#000"
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
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#fff',
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

export default AddQuestion;
