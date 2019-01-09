import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  withNavigation
} from "react-navigation";

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
import UserNotifications from "./src/screens/UserNotifications";
import NavigationService from "./src/services/NavigationService";
import { Permissions, Notifications } from "expo";

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
          NavigationService.setTopLevelNavigator(navigatorRef);
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
          NavigationService.navigate("CameraReply", {
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
    CoverageCategories: CoverageCategories,
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
