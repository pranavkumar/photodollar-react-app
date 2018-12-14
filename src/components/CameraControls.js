import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";

export default class CameraControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: 80,
          alignSelf: "flex-end",
          width: "100%",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
              <Ionicons name="ios-flash" size={32} color="blue" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "blue",
                  borderRadius: 25
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
              <Ionicons name="ios-reverse-camera" size={32} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  toggleFlash() {
    console.log("toggleFlash");
  }
}
