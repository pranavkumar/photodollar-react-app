import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { Camera, Permissions } from "expo";
import CameraControls from "../components/CameraControls";

export default class CameraReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (!hasCameraPermission) {
      return <Text>CAMERA NOT ALLOWED</Text>;
    } else {
      return (
        <View style={{ flexDirection: "row", height: "100%" }}>
          <CameraControls />
        </View>
      );
    }
  }
  snap = async () => {
    console.log("snap");
  };
}
