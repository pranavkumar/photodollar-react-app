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
        {UUser && <Text>{`${UUser.firstname} ${UUser.lastname}`}</Text>}
      </ScrollView>
    );
  }
  componentDidMount = async () => {
    try {
      let res = await Api.getUserProfile(this.state.UUserId);
      if (res.status == 200) {
        this.setState(update(this.state, { UUser: { $set: res.data } }));
        console.log(this.state);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
