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
    console.log(props);
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
            <TouchableOpacity onPress={this.props.onToggleFlash}>
              <Ionicons name="ios-flash" size={32} color="#42A5F5" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.props.onSnap}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#42A5F5",
                  borderRadius: 25
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.props.onToggleSide}>
              <Ionicons name="ios-reverse-camera" size={32} color="#42A5F5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  toggleFlash() {
    console.log("toggleFlash");
  }
}
