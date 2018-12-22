import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import Map from "./src/screens/Map";
import CoverageCategories from "./src/screens/CoverageCategories";
import CreateRequest from "./src/screens/CreateRequest";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CameraReply from "./src/screens/CameraReply";
import CreateResponse from "./src/screens/CreateResponse";
import UserProfile from "./src/screens/UserProfile";
import SignIn from "./src/screens/SignIn";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
  componentDidMount() {}
}

const RootStack = createStackNavigator(
  {
    Home: Home,
    Map:Map,
    CoverageCategories: CoverageCategories,
    CreateRequest: CreateRequest,
    CameraReply: CameraReply,
    CreateResponse:CreateResponse,
    UserProfile:UserProfile,
    SignIn:SignIn
  },
  {
    initialRouteName: "SignIn"
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
