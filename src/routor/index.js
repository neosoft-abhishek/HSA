
import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from '../container/Login'
import RegistrationScreen from '../container/Registration'
import ForgotScreen from '../container/ForgotPassword'
import OtpVerification from "../container/OtpVerification";
import { BookARoom } from "../container/BookARoom";
import LocationList from "../container/LocationList";
import SelectSlot from "../container/SelectSlot";
import SplashScreen from '..//container/SplashSlider'

const AuthNavigator = createStackNavigator({
    SplashScreen: { screen: SplashScreen },
    Login : {    screen: LoginScreen },
    Registration : { screen : RegistrationScreen },
    ForgotPassword: { screen : ForgotScreen},
    OTPVerifivation: {screen : OtpVerification}
});

const PostAuthNavigation = createStackNavigator({
    BookARoom : { screen : BookARoom},
    LocationList : { screen : LocationList},
    SelectSlot:{ screen : SelectSlot}
});

const AppNavigator = createSwitchNavigator({
    Auth : {    screen: AuthNavigator },
    PostAuth : { screen : PostAuthNavigation }
},
{
    mode: 'modal',
    headerMode: 'none',
  });

export default createAppContainer(AppNavigator);