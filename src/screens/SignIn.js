import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
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
      light: require("../../assets/fonts/OpenSans-Light.ttf"),
      regular: require("../../assets/fonts/OpenSans-Regular.ttf")
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
            KyaScene
          </Text>
          <Text style={{ fontSize: 16, color: "#FAFAFA", fontFamily: "light" }}>
            Sign in to request pics from all over Bengaluru.
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
          <View style={{ flexDirection: "row" }}>
            <TextInput
              keyboardType="numeric"
              placeholder="Mobile no"
              style={{
                width: "70%",
                height: 40,
                fontSize: 18,
                fontFamily: "light"
              }}
            />
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
                  justifyContent: "center",

                }}
              >
                <Text style={{fontFamily:"regular",color:"#64B5F6",fontWeight:"bold"}}>NEXT</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
  onNext() {
    console.log("on next");
  }
}
