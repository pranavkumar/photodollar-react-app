import React from "react";
import { View } from "react-native";

import * as Api from "../services/Api";
import * as Utils from "../services/Utils";
import update from "immutability-helper";
import { Permissions } from "expo";
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
      UUser: null,
      uUserId: "5c11ff3f19d3da6e905ec39c"
    };
    this.loadFonts = Utils.loadFonts.bind(this);
  }

  render() {
    let { fontLoaded, requests, uUserId } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <DefaultHeader />
        <Feed uUserId={uUserId} />
        <DefaultFooter navigation={this.props.navigation} />
      </View>
    );
  }

  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount = async () => {
    try {
      if (this.state.uUserId) {
        console.log("loading user...");
        let { status, data } = await Api.getUserProfile(this.state.uUserId);
        let uUser = data;
        await Utils.syncContacts(uUser.id, uUser.lastContactSync);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
