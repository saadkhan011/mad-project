import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Logo from "../assets/logo.png"

function SplashPage() {
    return (
        <View style={styles.container}>
            <View style={styles.buble1}></View>
            <View style={styles.bubleBorder}></View>
            <Image style={styles.img} source={Logo} />
            <View style={styles.buble2}></View>
            <View style={styles.bubleBorder2}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#6a5ae0"
    },
    buble1: {
        width: 70,
        bottom: 50,
        right: 100,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#796beb"
    },
    bubleBorder: {
        width: 150,
        top: 50,
        position: "absolute",
        left: 100,
        height: 150,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#796beb",
    },
    bubleBorder2: {
        width: 250,
        bottom: 10,
        position: "absolute",
        right: 200,
        height: 250,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: "#796beb",
    },
    buble2: {
        width: 70,
        top: 50,
        left: 100,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#796beb"
    },
    img: {
        width: 180,
        height: 150,
    },
    title: {
        color: "#fff",
        padding: "80",
        margin: "0 30 0 0",
        fontSize: 20,
        backgroundColor: "orange",
        fontWeight: "bold",
        fontFamily: "quill"
    }
});
export default SplashPage