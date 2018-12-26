import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  StatusBar
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import * as Util from "../utils/index.js";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions, Contacts } from "expo";

export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      UUserId: props.navigation.getParam("UUserId", "5c11ff3f19d3da6e905ec39c"),
      UUser: null,
      avatarHeight: 55,
      avatarWidth: 55
    };
    this.loadFonts = Util.loadFonts.bind(this);
    console.log(this.loadFonts);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  render() {
    const { UUser, fontLoaded, avatarWidth, avatarHeight } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0 }}>
        {UUser && (
          <View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#448AFF",
                height: "60%",
                padding: 10,
                paddingTop: 24,
                paddingBottom: 0,
                justifyContent: "center"
              }}
            >
              <Avatar
                rounded
                large
                source={{
                  uri: `${Api.FILE_ENDPOINT}userProfileImages/${
                    UUser.profileImage.name
                  }`
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={{ marginBottom: 8 }}
              />
              <Text
                style={{ fontSize: 18, fontFamily: "semiBold", color: "white" }}
              >{`${UUser.firstname} ${UUser.lastname}`}</Text>
              <Text style={{ fontFamily: "regular", color: "white" }}>{`${
                UUser.points
              } Pts`}</Text>
            </View>

            <View style={{ marginTop: 0, paddingTop: 0 }}>
              <Card
                containerStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontFamily: "semiBold" }}>Mobile</Text>
                  <Text style={{ fontFamily: "regular" }}>{`+91 ${
                    UUser.mobile
                  }`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontFamily: "semiBold" }}>Location</Text>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontFamily: "regular" }}>{`${
                      UUser.location.addressLine1
                    }`}</Text>
                    <Text style={{ fontFamily: "regular" }}>{`${
                      UUser.location.addressLine2
                    }`}</Text>
                    <Text style={{ fontFamily: "regular" }}>{`${
                      UUser.location.country
                    }`}</Text>
                    <Text />
                  </View>
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    );
  }

  componentDidMount = async () => {
    try {
      let res = await Api.getUserProfile(this.state.UUserId);
      if (res.status == 200) {
        let UUser = res.data;
        UUser.profileImage = UUser.profileImage || { name: "default.png" };
        UUser.location = UUser.location || {
          lat: 0,
          lng: 0,
          latDelta: 0,
          lngDelta: 0,
          addressLine1: "46, 4th B Cross Road",
          addressLine2: "5th Block, Koramangala, Bengaluru",
          country: "India",
          placeId: "abc",
          id: "123"
        };
        this.setState(update(this.state, { UUser: { $set: res.data } }));
        // console.log(this.state);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
