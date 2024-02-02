import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from './firebaseconfig.js';
const Login = ({ navigation }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };
    const submitSignInForm = (event) => {
        event.preventDefault();
        const { email, password } = state;
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const jsonValue = JSON.stringify(userCredential?.user);
                await AsyncStorage.setItem('my-key', jsonValue);
                navigation.navigate('HomePage')
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Icon name="angle-left" color="#000" style={styles.icon} onPress={() => navigation.goBack()} />
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.title}>Login</Text>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff" }]}>
                        <View style={styles.buttonContent}>
                            <Icon name="google" color="#000" style={[styles.icon, { marginEnd: 20 }]} />
                            <Text style={[styles.btnText, { color: "#000", fontSize: 12 }]}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: "#0056b2" }]}>
                        <View style={styles.buttonContent}>
                            <Icon name="facebook" color="#fff" style={[styles.icon, { marginEnd: 20 }]} />
                            <Text style={[styles.btnText, { fontSize: 12 }]}>Login with facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.smallText}>OR</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={state.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />

                    {/* Password Input */}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#999"
                        style={styles.input}
                        secureTextEntry
                        value={state.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                    <TouchableOpacity style={styles.btn} onPress={submitSignInForm}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('SignUp')} style={styles.smallText}>Dont have an account? Sign up</Text>
                    <Text style={styles.smallText}>By continue you agree to the term and services and privacy policy</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    input: {
        height: 50,
        borderRadius: 20,
        width: '90%',
        color: 'black',
        marginVertical: 10,
        fontSize: 9,
        backgroundColor: "#fff",
        paddingLeft: 25,
    },
    smallText: {
        fontSize: 8,
        textAlign: 'center',
        paddingTop: 20,
        color: "#000"
    },
    buttonContent: {
        flexDirection: 'row',
    },
    icon: {
        textAlign: "left",
        fontSize: 23,
        fontWeight: '100',
        paddingLeft: 20,
    },
    title: {
        fontSize: 15,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
    box: {
        backgroundColor: "#efeefc",
        paddingTop: 50,
        width: "90%",
        flex: 1,
    },
    btn: {
        backgroundColor: "#6a5ae0",
        padding: 13,
        width: "90%",
        borderRadius: 30,
        marginTop: 20
    },
    btnText: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
    },
});

export default Login;
