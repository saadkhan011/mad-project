import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { auth } from './firebaseconfig.js';
const SignUp = ({ navigation }) => {

    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };
    const submitForm = (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = state;

        // Check if any field is empty
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        // Validate if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const jsonValue = JSON.stringify(userCredential?.user);
                await AsyncStorage.setItem('my-key', jsonValue);
                navigation.navigate('HomePage')
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    const googleLogin = (event) => {
        event.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithCredential(auth, provider)
            .then(() => {
                navigation.navigate('HomePage')
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Icon name="angle-left" color="#000" style={styles.icon} onPress={() => navigation.goBack()} />
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.title}>Sign up</Text>
                    <TouchableOpacity onPress={googleLogin} style={[styles.btn, { backgroundColor: "#fff" }]}>
                        <View style={styles.buttonContent}>
                            <Icon name="google" color="#000" style={[styles.icon, { marginEnd: 20 }]} />
                            <Text style={[styles.btnText, { color: "#000", fontSize: 12 }]}>Sign up with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: "#0056b2" }]}>
                        <View style={styles.buttonContent}>
                            <Icon name="facebook" color="#fff" style={[styles.icon, { marginEnd: 20 }]} />
                            <Text style={[styles.btnText, { fontSize: 12 }]}>Sign up with facebook</Text>
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

                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#999"
                        style={styles.input}
                        secureTextEntry
                        value={state.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                    />

                    <TouchableOpacity style={styles.btn} onPress={submitForm}>
                        <Text style={styles.btnText}>Sign up</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Login')} style={styles.smallText}>Already have an account? Login</Text>
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
        marginVertical: 10,
        color: 'black',
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
        paddingTop: 30,
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

export default SignUp;
