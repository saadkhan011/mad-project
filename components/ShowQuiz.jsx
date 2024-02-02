import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { database } from "./firebaseconfig";
import { ref, child, get, remove } from "firebase/database";
function ShowQuiz({ navigation }) {
    const [data, setdata] = useState({});
    const dbRef = ref(database);
    const logout = async () => {
        try {
          await AsyncStorage.removeItem('my-key'); 
          navigation.navigate('WelcomePage');
        } catch (error) {
          console.error('Error while logging out:', error);
        }
      };
    useEffect(() => {
        get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
                let value = snapshot.val();
                console.log(value + "sad");
                setdata(value);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            // console.error(error);
            console.error("error comes");
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.buble1}></View>
                <View style={styles.bubleBorder}></View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name="angle-left" color="#fff" style={styles.icon} onPress={() => navigation.goBack()} />
                    <Text style={[styles.title, { color: '#fff', paddingVertical: 10 }]}>Select Quiz</Text>
                </View>
                <View style={styles.buble2}></View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <View style={styles.box}>
                        {Object.keys(data).map((quizId, indx) => (
                            <TouchableOpacity key={indx} style={[styles.btn, { backgroundColor: "#fff", borderWidth: 1 }]} onPress={() => navigation.navigate('QuestionPage', { quizData: data[quizId] })}>
                                <Text style={styles.title}>{data[quizId].title}</Text>
                                <Text style={[styles.smallText, { textAlign: "left" }]}>Category: {data[quizId].category}</Text>
                                <Text style={[styles.smallText, { textAlign: "left" }]}>Number of Question: {data[quizId].numberOfQuestions}</Text>
                                <Text style={[styles.smallText, { textAlign: "left" }]}>Description: {data[quizId].description}</Text>
                            </TouchableOpacity>
                        ))}
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
        padding: 20,
    },
    smallText: {
        fontSize: 10,
        textAlign: 'center',
        paddingTop: 20,
        color: "#000"
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

export default ShowQuiz;
