import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WelcomeImg from "../assets/welcome-image.png"
function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buble1}></View>
      <View style={styles.bubleBorder}></View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Image style={styles.img} source={WelcomeImg} />
      </View>
      <View style={styles.buble2}></View>
      <View style={styles.box}>
        <Text style={styles.title}>Take Part in challenges with Friend</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        {/* <Button
          title="Go to Details"
          
        /> */}
      </View>
        <Text onPress={() => navigation.navigate('Login')} style={styles.smallText}>Already have an account? Login</Text>
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
    width: 300,
    height: 350,
  },
});
export default WelcomePage