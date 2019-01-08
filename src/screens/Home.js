import React from "react";
import { View } from "react-native";

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
      location: {
        addressLine1: "1st a main road, 15th cross",
        addressLine2: "HSR Layout, Sector 6",
        city: "Bengaluru",
        country: "Karnataka",
        lat: 12.9081,
        lng: 77.6476,
        latDelta: 0.0222,
        lngDelta: 0.0121
      }
    };
    this.loadFonts = Utils.loadFonts.bind(this);
    this.getUser = Utils.getUser.bind(this);
    this.registerForPushNotifications = Utils.registerForPushNotifications.bind(this);
  }

  render() {
    let { fontLoaded, requests, uUser, location } = this.state;
    if (!fontLoaded) return null;

    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <DefaultHeader navigation={this.props.navigation} uUserId={uUser.id} location={location}/>
        <Feed uUserId={uUser.id} navigation={this.props.navigation} location={location}/>
        <DefaultFooter navigation={this.props.navigation} uUserId={uUser.id} location={location} />
      </View>
    );
  }

  componentWillMount = async () => {
    await this.loadFonts();
    await this.getUser();
    await this.registerForPushNotifications();

  };
  componentDidMount = async () => {
    try {
      if (this.state.uUser.id) {
        console.log("loading user...");
        let { status, data } = await Api.getUserProfile(this.state.uUser.id);
        let uUser = data;
        await Utils.syncContacts(uUser.id, uUser.lastContactSync);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
