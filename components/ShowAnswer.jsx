import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ShowAnswer({ navigation }) {
    const route = useRoute();
    const { answers } = route.params;

console.log(answers)

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.buble1}></View>
                <View style={styles.bubleBorder}></View>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Icon name="angle-left" color="#fff" style={styles.icon} onPress={() => navigation.goBack()} />
                    <Text style={[styles.title, { color: '#fff' }]}>Your Answers</Text>
                </View>
                <View style={styles.buble2}></View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.box}>
                        {answers.map((element, indx) => (
                            element.actualAnswer === element.yourAnswer ? (
                                <TouchableOpacity key={indx} style={[styles.btn, { backgroundColor: "#379b37", borderWidth: 1 }]}>
                                    <Text style={[styles.btnText, { color: "#fff", textAlign: "left", fontSize: 12 }]}>{element.actualAnswer}</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity key={indx} style={[styles.btn, { backgroundColor: "#bc3131", borderWidth: 1 }]}>
                                    <Text style={[styles.btnText, { color: "#fff", textAlign: "left", fontSize: 12 }]}>{element.actualAnswer}</Text>
                                </TouchableOpacity>
                            )
                        ))}
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HomePage')}>
                            <Text style={styles.btnText}>Back to Home Page</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView >
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

export default ShowAnswer;
