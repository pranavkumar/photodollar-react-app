import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "expo";

export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      },
      headerStyle: {
        backgroundColor: "transparent"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      semiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
      light: require("../../assets/fonts/OpenSans-Light.ttf")
    });
    this.setState({ fontLoaded: true });
  };
  render() {
    if (!this.state.fontLoaded) return null;
    return (
      <View
        style={{
          backgroundColor: "#42A5F5",
          flex: 1,
          minHeight: "100%",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: 8,
            marginLeft: 16,
            marginRight: 16
          }}
        >
          <Text
            style={{ fontSize: 38, color: "#FAFAFA", fontFamily: "semiBold" }}
          >
            Coveraze
          </Text>
          <Text style={{ fontSize: 16, color: "#FAFAFA", fontFamily: "light" }}>
            Request pics from all over Bangalore.
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#FAFAFA",
            margin: 16,
            borderRadius: 4,
            padding: 16
          }}
        >
          <TextInput
            keyboardType="numeric"
            placeholder="Mobile no"
            style={{
              width: "100%",
              height: 40,
              fontSize: 18,
              fontFamily: "light"
            }}
          />
        </View>
      </View>
    );
  }
}
