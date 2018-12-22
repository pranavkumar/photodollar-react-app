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

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      isTakingPicture: false,
      request: props.navigation.getParam("request", null)
    };
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (!hasCameraPermission) {
      return null;
    } else {
      return (
        <View style={{ flexDirection: "row", height: "100%" }}>
          <Camera
            style={{ flex: 1, flexDirection: "row" }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <CameraControls
              isTakingPicture={this.state.isTakingPicture}
              onSnap={this.snap}
              onToggleFlash={this.toggleFlash}
              onToggleSide={this.toggleSide}
            />
          </Camera>
        </View>
      );
    }
  }
  snap = async () => {
    console.log("taking pic...");
    if (this.camera) {
      this.setState({ isTakingPicture: true });
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
      this.setState({ isTakingPicture: false });
      this.props.navigation.navigate("CreateResponse", {
        image: photo,
        request: this.state.request
      });
    }
  };
  toggleFlash() {
    console.log("toggleFlash");
  }
  toggleSide() {
    console.log("toggleSide");
  }
}
