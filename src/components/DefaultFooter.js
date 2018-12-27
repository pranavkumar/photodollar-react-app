import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

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
    this.navigation = props.navigation;
  }
  componentWillReceiveProps(props) {
    this.navigation = props.navigation;
  }
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
            <SimpleLineIcons name="user" size={28} color="#616161" />
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
            onPress={this.gotoSearch.bind(this)}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AntDesign name="search1" size={32} color="#616161" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  gotoProfile() {
    if (!this.navigation) return;
    this.navigation.navigate("UserProfile");
  }
  gotoRequest() {
    if (!this.navigation) return;
    this.navigation.navigate("CreateRequest");
  }
  gotoSearch() {
    if (!this.navigation) return;
  }
}
