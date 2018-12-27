import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// import * as Utils from "../services/Utils";

// import update from "immutability-helper";
// import {
//   Ionicons
// } from "@expo/vector-icons";

export default class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ height: 60, backgroundColor: "#EEEEEE", padding: 16 }}>
        <Text style={{ fontFamily: "light", fontSize: 22, color: "#616161" }}>
          KyaScene
        </Text>
      </View>
    );
  }
}
