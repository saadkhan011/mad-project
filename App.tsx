import {Component, useEffect, useState} from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SplashPage from './components/SplashPage';
import WelcomePage from './components/WelcomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import HomePage from './components/HomePage';
import CreateQuiz from './components/CreateQuiz';
import AddQuestion from './components/AddQuestion';
import QuestionPage from './components/QuestionPage';
import Congratulation from './components/Congratulation';
import ShowQuiz from './components/ShowQuiz';
import ShowAnswer from './components/ShowAnswer';
export default function App () {
  useEffect(() => {
    SplashScreen.hide();
  }, []); 
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShowAnswer"
            component={ShowAnswer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Congratulation"
            component={Congratulation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShowQuiz"
            component={ShowQuiz}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuestionPage"
            component={QuestionPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddQuestion"
            component={AddQuestion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateQuiz"
            component={CreateQuiz}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
