import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as Utils from "../services/Utils";

import update from "immutability-helper";
import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  EvilIcons,
  AntDesign
} from "@expo/vector-icons";

export default class DefaultFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uUserId: null
    };
    this.navigation = props.navigation;
  }
  componentWillReceiveProps = async props => {
    this.navigation = props.navigation;

    await this.setState({ uUserId: props.uUserId });
    console.log(this.state);
  };
  render() {
    return (
      <View
        style={{
          alignSelf: "flex-end",
          height: 50,
          width: "100%",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            width: "33%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.gotoProfile.bind(this)}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SimpleLineIcons name="user" size={26} color="#616161" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "33%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.gotoRequest.bind(this)}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SimpleLineIcons name="plus" size={32} color="#E64A19" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "33%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.gotoNotifications.bind(this)}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AntDesign name="folder1" size={28} color="#616161" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  gotoProfile() {
    if (!this.navigation) return;
    this.navigation.navigate("UserProfile", { uUserId: this.state.uUserId });
  }
  gotoRequest() {
    if (!this.navigation) return;
    this.navigation.navigate("CreateRequest", { uUserId: this.state.uUserId });
  }
  gotoNotifications() {
    if (!this.navigation) return;
    this.navigation.navigate("UserNotifications", { uUserId: this.state.uUserId });
  }
}
