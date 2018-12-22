import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions, Contacts } from "expo";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UUserId: props.navigation.getParam("UUserId", "5c11ff3f19d3da6e905ec39c"),
      UUser: null
    };
    console.log(this.state);
  }
  render() {
    const { UUser } = this.state;
    return (
      <ScrollView style={{ padding: 10 }}>
        {UUser && (
          <View>
            <View style={{ alignItems: "center" }}>
              <Avatar
                rounded
                medium
                source={{
                  uri: `${Api.FILE_ENDPOINT}userProfileImages/${
                    UUser.profileImage.name
                  }`
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={{ marginBottom: 8 }}
              />
              <Text style={{ fontSize: 16 }}>{`${UUser.firstname} ${
                UUser.lastname
              }`}</Text>
              <Text>{`${UUser.points} Pts`}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Card containerStyle={{marginLeft:0,marginRight:0}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>Mobile</Text>
                  <Text>{`+91 ${UUser.mobile}`}</Text>
                </View>
                <View>
                  <Text>Location</Text>
                  <Text>{`${UUser.location.addressLine1}`}</Text>
                  <Text>{`${UUser.location.addressLine2}`}</Text>
                  <Text>{`${UUser.location.country}`}</Text>
                  <Text />
                </View>
              </Card>
            </View>
          </View>
        )}
      </ScrollView>
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
        console.log(this.state);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
