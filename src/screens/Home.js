import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import * as Api from "../services/Api";
import * as Util from "../utils";
import * as Utils from "../services/Utils";

import update from "immutability-helper";
import { ImagePicker, Permissions, Contacts } from "expo";
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
      UUser: {
        id: "5c11ff3f19d3da6e905ec39c"
      },
      uUserId: "5c11ff3f19d3da6e905ec39c",
      refresh: false
    };
    this.loadFonts = Util.loadFonts.bind(this);
  }

  render() {
    let { fontLoaded, requests } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <View style={{ height: 60, backgroundColor: "#EEEEEE", padding: 16 }}>
          <Text style={{ fontFamily: "light", fontSize: 22, color: "#616161" }}>
            KyaScene
          </Text>
        </View>
        <Feed requests={requests} />
        <DefaultFooter navigation={this.props.navigation} />
      </View>
    );
  }

  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount = async () => {
    try {
      let { status, data } = await Api.getFeed(this.state.UUser.id);
      if (status == 200) {
        this.setState(update(this.state, { requests: { $set: data } }));
      }
      if (this.state.uUserId) {
        console.log("loading user...");
        let { status, data } = await Api.getUserProfile(this.state.uUserId);
        console.log(data);
        let uUser = data;
        await Utils.syncContacts(uUser.id, uUser.lastContactSync);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
