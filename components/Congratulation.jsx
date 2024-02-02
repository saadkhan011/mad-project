import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckImg from "../assets/check.png"
import AsyncStorage from '@react-native-async-storage/async-storage';

function Congratulation({ navigation }) {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('my-key');
      navigation.navigate('WelcomePage');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buble1}></View>
      <View style={styles.bubleBorder}></View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
        <Text onPress={logout} style={[styles.label, { color: "#fff", padding: 20 }]}>Logout</Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Image style={styles.img} source={CheckImg} />
      </View>
      <View style={styles.buble2}></View>
      <View style={styles.box}>
        <Text style={styles.title}>Congratulation you have successfully created a quiz</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.btnText}>Back to Home Page</Text>
        </TouchableOpacity>
      </View>
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
  smallText: {
    fontSize: 8,
    textAlign: 'center',
    paddingBottom: 10
  },
  title: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#6a5ae0",
    padding: 13,
    width: "100%",
    borderRadius: 30,
    marginTop: 30
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  box: {
    backgroundColor: "#fff",
    marginBottom: 30,
    flex: 1,
    width: "90%",
    padding: 24,
    borderRadius: 30,
  },
  buble1: {
    width: 70,
    top: 50,
    right: 100,
    position: "absolute",
    height: 70,
    borderRadius: 100,
    backgroundColor: "#796beb"
  },
  buble2: {
    width: 70,
    top: 500,
    left: 100,
    height: 70,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#796beb"
  },
  bubleBorder: {
    width: 150,
    top: 50,
    position: "absolute",
    left: 10,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#796beb",
  },
  img: {
    width: 200,
    height: 200,
  },
});
export default Congratulation