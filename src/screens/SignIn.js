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
    this.setUser = Utils.setUser.bind(this);
    this.navigation = props.navigation;
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentWillReceiveProps(props) {
    let { navigation } = props;
    if (navigation) {
      console.log("we have navigation");
    } else {
      console.log("no navigation");
    }
  }
  componentDidMount = async () => { };
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
            marginBottom: 32,
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
        <View style={{ marginTop: 16 }}>
          <View
            style={{
              alignItems: "center",
              padding: 16,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "regular",
                color: "#757575",
                textAlign: "center"
              }}
            >
              By signining in, you indicate that you have read PhotoDollar's
              privacy policy and terms & conditions and agree with the same.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 16
            }}
          >
            <Text
              style={{
                fontFamily: "regular",
                marginRight: 8,
                color: "#64B5F6"
              }}
            >
              Privacy
            </Text>
            <Text style={{ fontFamily: "regular", color: "#64B5F6" }}>
              Terms & Conditions
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16
            }}
          >
            <Text style={{ fontFamily: "regular", marginRight: 8 }}>
              {"\u00A9"}
            </Text>
            <Text style={{ fontFamily: "regular", color: "#757575" }}>
              2018 Liben pvt ltd
            </Text>
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
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
        );
        let responseJson = await response.json();

        let { status, data } = await Api.signinUser("facebook", responseJson);
        console.log(status);

        if (status == 200) {
          await this.setUser(data.uUser, data.token);
          this.navigation.navigate("Home", { uUser: data.uUser });
        }
      } else {
        // type === 'cancel'
        console.log("user cancelled login");
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };
  loginGoogle = async () => {
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

      if (result.type === "success") {
        let { status, data } = await Api.signinUser("google", result.user);
        console.log(status);

        if (status == 200) {
          await this.setUser(data.uUser, data.token);
          this.navigation.navigate("Home", { uUser: data.uUser });
        }
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
