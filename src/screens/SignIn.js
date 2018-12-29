import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Animated
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import * as Utils from "../services/Utils";

export default class SignIn extends React.Component {
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
    this.state = { fontLoaded: false, mobile: null };
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount = async () => {

  };
  render() {
    if (!this.state.fontLoaded) return null;
    let { mobile } = this.state;
    return (
      <View
        style={{
          backgroundColor: "white",
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
            style={{ fontSize: 38, color: "#E64A19", fontFamily: "semiBold" }}
          >
            KyaScene
          </Text>
          <Text style={{ fontSize: 16, color: "#616161", fontFamily: "light" }}>
            Request pics from all over Bengaluru.
          </Text>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 20, fontFamily: "light" }}>SignIn</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#FAFAFA",
            margin: 16,
            borderRadius: 4,
            padding: 16,
            height: 70
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <TextInput
                value={!mobile ? "" : String(mobile)}
                onChangeText={text => {
                  this.setState({ mobile: text });
                }}
                keyboardType="numeric"
                placeholder="Mobile no"
                style={{
                  width: "100%",
                  height: 40,
                  fontSize: 16,
                  fontFamily: "light",
                  color: "#1E88E5"
                }}
                placeholderTextColor="#1E88E5"
              />
            </View>
            <View
              style={{
                width: "30%",
                flexDirection: "column"
              }}
            >
              <TouchableHighlight
                onPress={this.onNext.bind(this)}
                underlayColor="#E0E0E0"
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    color: "#1E88E5",
                    fontWeight: "bold"
                  }}
                >
                  NEXT
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
  onNext() {
    console.log(this.state.mobile);
  }
}
