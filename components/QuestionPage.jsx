import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function QuestionPage({ navigation }) {
    const route = useRoute();
    const { quizData } = route.params;


    const [count, setCount] = useState(1);
    const [question, setQuestion] = useState(quizData[`question${count}`]);
    const [array, setArray] = useState([]);
    
    function checkAnswer(selectedOption) {
        // Assuming question is an object with a property 'answer'
        const obj = {
            yourAnswer: selectedOption,
            actualAnswer: question?.answer
        };
    
        // Update count for the next question
        setCount((prevCount) => prevCount + 1);
    
        // Push the answer to the array
        setArray((prevArray) => [...prevArray, obj]);
    
        console.log(array);
    }
    
    useEffect(() => {
        // Update the question based on the count
        if (count <= quizData.numberOfQuestions) {
            setQuestion(quizData[`question${count}`]);
        } else {
            // Navigate to the 'ShowAnswer' screen
            navigation.navigate('ShowAnswer', { answers: array });
        }
    }, [count, array, navigation, quizData]);
    
    // Rest of your component code...
    


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.buble1}></View>
                <View style={styles.bubleBorder}></View>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Icon name="angle-left" color="#fff" style={styles.icon} onPress={() => navigation.goBack()} />
                    <Text style={[styles.title, { color: '#fff' }]}>Create Quiz</Text>
                </View>
                <View style={styles.buble2}></View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.box}>
                        <Text style={styles.label}>Question {count} 0f {quizData?.numberOfQuestions}</Text>
                        <Text style={[styles.title, { textAlign: "left", marginTop: 10 }]}>{question?.question}</Text>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", borderWidth: 1 }]} onPress={() => checkAnswer(question?.option1)}>
                            <Text style={[styles.btnText, { color: "#000", textAlign: "left", fontSize: 12 }]}>{question?.option1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", borderWidth: 1 }]} onPress={() => checkAnswer(question?.option2)}>
                            <Text style={[styles.btnText, { color: "#000", textAlign: "left", fontSize: 12 }]}>{question?.option2}</Text>
                        </TouchableOpacity>
                        {question?.option3 &&
                            <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", borderWidth: 1 }]} onPress={() => checkAnswer(question?.option3)}>
                                <Text style={[styles.btnText, { color: "#000", textAlign: "left", fontSize: 12 }]}>{question?.option3}</Text>
                            </TouchableOpacity>
                        }
                        {question?.option4 &&
                            <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", borderWidth: 1 }]} onPress={() => checkAnswer(question?.option4)}>
                                <Text style={[styles.btnText, { color: "#000", textAlign: "left", fontSize: 12 }]}>{question?.option4}</Text>
                            </TouchableOpacity>
                        }
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

export default QuestionPage;
