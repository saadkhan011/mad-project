import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PeopleImg from "../assets/people.png"
function HomePage({ navigation }) {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkUserAuthentication();
  }, []);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('my-key');
      navigation.navigate('WelcomePage');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  const checkUserAuthentication = async () => {
    try {
      // Fetch user data from AsyncStorage
      const userJson = await AsyncStorage.getItem('my-key');
      const user = JSON.parse(userJson);

      // If user data is not available, navigate to the login or sign-up screen
      if (!user) {
        navigation.navigate('WelcomePage'); // Replace with the appropriate screen
      } else {
        // Set user data in state for future use
        const array = [user?.displayName, user?.email, user?.uid];
        setUserData(array);
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
    }
  };
  if (!userData) {
    // If user data is not available, don't render the component
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buble1}></View>
      <View style={styles.bubleBorder}></View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Image style={styles.img} source={PeopleImg} />
      </View>
      <View style={styles.buble2}></View>
      <View style={styles.box}>
        <Text style={styles.title}>Create a quiz or attempt a quiz</Text>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ShowQuiz')}>
            <Text style={styles.btnText}>Attempt Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateQuiz')}>
            <Text style={styles.btnText}>Create Quiz</Text>
          </TouchableOpacity>
        </View>
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
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 14,
    width: "48%",
    borderRadius: 30,
    marginTop: 30
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
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
export default HomePage