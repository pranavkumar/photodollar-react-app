import React from "react";
import { View, NativeModules, DeviceEventEmitter } from "react-native";

import RNPdnative from "../../pdnative";

import * as Api from "../services/Api";
import * as Utils from "../services/Utils";
import update from "immutability-helper";
import { Permissions, Notifications } from "expo";
import DefaultHeader from "../components/DefaultHeader";
import DefaultFooter from "../components/DefaultFooter";
import Feed from "../components/Feed";

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      uUser: null,
      location: null
    };
    this.resolveUI = Utils.resolveUI.bind(this);
    this.resolveUser = Utils.resolveUser.bind(this);
    this.resolveLocation = Utils.resolveLocation.bind(this);
    this.registerForPushNotifications = Utils.registerForPushNotifications.bind(
      this
    );
  }

  componentWillMount = async () => {
    await this.resolveUI();
    await this.resolveUser();
    await this.resolveLocation();
    await this.registerForPushNotifications();

    if (this.state.uUser && this.state.location) {
      console.log(`loading user with id ${this.state.uUser.id}`);
      // let { status, data } = await Api.getUserProfile(this.state.uUser.id);
      // let uUser = data;
      // await Utils.syncContacts(uUser.id, uUser.lastContactSync);
    } else {
      console.log("no user found...will be fetching anon feed");
      this.props.navigation.navigate("SignIn");
    }
    // DeviceEventEmitter.addListener("notifying", function(e) {
    //   console.log("notifying...." + JSON.stringify(e));
    // });
  };
  onNotifying() {
    console.log("some notifying...");
  }
  componentDidMount = async () => {
    try {
      //   setTimeout(async function() {
      //     await RNPdnative.showNotification({
      //       uRequestTitle: "Greatest request of all times...",
      //       uRequestId: "1234",
      //       uUserName: "Pranav Kumar",
      //       uResponseImages:[]
      //     });
      //   }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  componentWillReceiveProps = async (props) => {
    if (props.navigation) {
      let uUser = props.navigation.getParam("uUser", null);
      if (uUser) {
        await this.setState({uUser:uUser});
        console.log(`setting user after login ${JSON.stringify(uUser)}`);
      }
    }

  }

  render() {
    let { fontLoaded, uUser, location } = this.state;
    if (!fontLoaded || !uUser || !location) return null;
    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <DefaultHeader
          navigation={this.props.navigation}
          uUser={uUser}
          location={location}
        />
        <Feed
          uUser={uUser}
          navigation={this.props.navigation}
          location={location}
        />
        <DefaultFooter
          navigation={this.props.navigation}
          uUser={uUser}
          location={location}
        />
      </View>
    );
  }
}
