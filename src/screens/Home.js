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
      requests: [],
      uUser: {},
      location: null
    };
    this.loadFonts = Utils.loadFonts.bind(this);
    this.getUser = Utils.getUser.bind(this);
    this.registerForPushNotifications = Utils.registerForPushNotifications.bind(
      this
    );
    this.resolveLocation = Utils.resolveLocation.bind(this);
  }

  render() {
    let { fontLoaded, requests, uUser, location } = this.state;
    if (!fontLoaded) return null;

    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <DefaultHeader
          navigation={this.props.navigation}
          uUserId={uUser.id}
          location={location}
        />
        <Feed
          uUserId={uUser.id}
          navigation={this.props.navigation}
          location={location}
        />
        <DefaultFooter
          navigation={this.props.navigation}
          uUserId={uUser.id}
          location={location}
        />
      </View>
    );
  }

  componentWillMount = async () => {
    await this.loadFonts();
    await this.getUser();
    console.log(this.state);
    await this.registerForPushNotifications();
    await this.resolveLocation();
    DeviceEventEmitter.addListener("notifying", function(e: Event) {
      // handle event.
      console.log("notifying....");
    });
  };
  onNotifying() {
    console.log("some notifying...");
  }
  componentDidMount = async () => {
    try {
      await RNPdnative.show("holla...");
      let echoMsg = await RNPdnative.echo("message is here fuckers");
      console.log(echoMsg);

      setTimeout(async function() {
        await RNPdnative.showNotification(
          "Vinodini Sinha has request for your best food pics in your area."
        );
      }, 5000);

      if (this.state.uUser.id) {
        console.log("loading user...");
        console.log(this.state.uUser);
        let { status, data } = await Api.getUserProfile(this.state.uUser.id);
        let uUser = data;
        await Utils.syncContacts(uUser.id, uUser.lastContactSync);
      } else {
        console.log("no user found...");
        // this.props.navigation.navigate("SignIn");
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleNotification = notification => {
    console.log("we have notification");
  };
}
