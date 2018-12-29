import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  AsyncStorage
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import * as Utils from "../services/Utils";
import { Facebook, Google } from "expo";


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
  componentDidMount = async () => {};
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
            PhotoDollar
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
            justifyContent: "space-around",
            flexDirection: "row",
            backgroundColor: "#FAFAFA",
            borderRadius: 4,
            padding: 16
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",

              marginRight: 16
            }}
          >
            <TouchableOpacity onPress={this.loginFacebook.bind(this)}>
              <AntDesign name="facebook-square" size={32} color="#1E88E5" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",

              marginRight: 16
            }}
          >
            <TouchableOpacity onPress={this.loginGoogle.bind(this)}>
              <AntDesign name="google" size={32} color="#1E88E5" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",

              marginRight: 16
            }}
          >
            <TouchableOpacity onPress={this.loginTwitter.bind(this)}>
              <AntDesign name="twitter" size={32} color="#1E88E5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(
        "1935714499798688",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        console.log("login success fetching data..");
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
        );
        let responseJson = await response.json();
        console.log(responseJson);
        let { status, data } = await Api.signinUser("facebook", responseJson);
        console.log(status);
        console.log(data);
      } else {
        // type === 'cancel'
        console.log("user cancelled login");
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };
  loginGoogle = async () => {
    console.log("logging in with google");
    const androidClientId =
      "265922774781-qtfflis5pdk5lji03jqr64r563pp6fad.apps.googleusercontent.com";
    const iosClientId =
      "265922774781-25ark99e9hp2e5rgqvad4t695vd6ttda.apps.googleusercontent.com";
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ["profile", "email"]
      });
      console.log(result);
      if (result.type === "success") {
        let { status, data } = await Api.signinUser("google", result.user);
        console.log(status);
        console.log(data);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  loginTwitter = async () => {
    console.log("logging in with twitter");
  };
}
