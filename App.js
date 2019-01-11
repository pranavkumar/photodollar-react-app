import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  withNavigation
} from "react-navigation";

import Navigation from "./src/services/Navigation";
import { Permissions, Notifications } from "expo";


import Home from "./src/screens/Home";
// import CoverageCategories from "./src/screens/CoverageCategories";
import UserProfile from "./src/screens/UserProfile";
import SignIn from "./src/screens/SignIn";
import UserNotifications from "./src/screens/UserNotifications";

import CreateRequest from "./src/screens/CreateRequest";
import Map from "./src/screens/Map";
import ForwardRequest from "./src/screens/ForwardRequest";

import CreateResponse from "./src/screens/CreateResponse";
import CameraReply from "./src/screens/CameraReply";

import Search from "./src/screens/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    if (props.exp && props.exp.notification) {
      console.log(props.exp.notification);
    }
  }
  render() {
    console.disableYellowBox = true;
    return (
      <AppContainer
        ref={navigatorRef => {
          Navigation.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this.handleNotification.bind(this)
    );
  }
  handleNotification = async notification => {
    console.log(notification);
    if (notification.origin == "selected") {
      if (notification.data) {
        let { type, uRequestId } = notification.data;
        if (type == "NEW_LOCAL_REQUEST" && uRequestId) {
          console.log("trying to redirect...");
          Navigation.navigate("CameraReply", {
            request: { id: uRequestId }
          });
        }
      }
    }
  };
}

export default App;

const RootStack = createStackNavigator(
  {
    Home: Home,
    Map: Map,
    CreateRequest: CreateRequest,
    CameraReply: CameraReply,
    CreateResponse: CreateResponse,
    UserProfile: UserProfile,
    SignIn: SignIn,
    ForwardRequest: ForwardRequest,
    Search: Search,
    UserNotifications: UserNotifications
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
