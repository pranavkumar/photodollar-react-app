import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  EvilIcons,
  AntDesign
} from "@expo/vector-icons";

export default class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: "#EEEEEE",
          padding: 16,
          flexDirection: "row"
        }}
      >
        <View style={{ width: "66%" }}>
          <Text style={{ fontFamily: "light", fontSize: 22, color: "#616161" }}>
            KyaScene
          </Text>
        </View>
        <View
          style={{
            width: "33%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            <AntDesign name="search1" size={24} color="#616161" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
