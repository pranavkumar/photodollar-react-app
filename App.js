import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./src/screens/Home";
import Map from "./src/screens/Map";
import CoverageCategories from "./src/screens/CoverageCategories";
import CreateRequest from "./src/screens/CreateRequest";
import CameraReply from "./src/screens/CameraReply";
import CreateResponse from "./src/screens/CreateResponse";
import UserProfile from "./src/screens/UserProfile";
import SignIn from "./src/screens/SignIn";
import ForwardRequest from "./src/screens/ForwardRequest";
import Search from "./src/screens/Search";
import Notifications from "./src/screens/Notifications";


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
    SignIn:SignIn,
    ForwardRequest:ForwardRequest,
    Search: Search,
    Notifications:Notifications
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
