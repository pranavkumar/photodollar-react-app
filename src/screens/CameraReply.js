import React from "react";
import {
  Text,
  View,
  ActivityIndicator
} from "react-native";
import update from "immutability-helper";
import { Camera, Permissions, ImageManipulator } from "expo";
import * as Utils from "../services/Utils";
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
      type: Camera.Constants.Type.back,
      flashMode:Camera.Constants.FlashMode.off,
      isTakingPicture: false,
      request: props.navigation.getParam("request", null)
    };

    this.loadFonts = Utils.loadFonts.bind(this);
    this.resolveCamera = Utils.resolveCamera.bind(this);
  }
  componentWillMount = async () => {



  };
  async componentDidMount() {
    await this.loadFonts();
    await this.resolveCamera();
  }
  componentWillUnmount() {

  }
  render() {
    if (!this.state.fontLoaded) return null;
    const { hasCameraPermission } = this.state;
    if (!hasCameraPermission) {
      console.log("no camera Permissions...");
      return null;
    } else {
      return (
        <View style={{ flexDirection: "column", height: "100%" }}>
          <Camera
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "blue",
              justifyContent: "center"
            }}

            type={this.state.type}
            flashMode={this.state.flashMode}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 60,
                flexDirection: "row"
              }}
            >
              {this.state.isTakingPicture && (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#212121",
                    borderRadius: 2,
                    padding: 8,
                    opacity: 0.8
                  }}
                >
                  <ActivityIndicator size="small" color="#9E9E9E" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "regular",
                      color: "#9E9E9E",
                      marginLeft: 8
                    }}
                  >
                    Loading...
                  </Text>
                </View>
              )}
            </View>

            <CameraControls
              isTakingPicture={this.state.isTakingPicture}
              onSnap={this.snap.bind(this)}
              onToggleFlash={this.toggleFlash.bind(this)}
              onToggleSide={this.toggleSide.bind(this)}
            />
          </Camera>
        </View>
      );
    }
  }
  snap = async () => {
    console.log("taking pic...");
    try {
      if (this.camera) {
        this.setState({ isTakingPicture: true });
        await this.camera.takePictureAsync({
          onPictureSaved: this.onPictureSaved.bind(this)
        });
        this.camera.pausePreview();

      }
    } catch (err) {
      console.log(err);
    }
  };
  onPictureSaved = async photo => {

    let dim = photo.width <= photo.height ? photo.width : photo.height;
    let originX = parseInt((photo.width - dim) / 2);
    let originY = parseInt((photo.height - dim) / 2);

    const resizedImage = await ImageManipulator.manipulate(photo.uri, [
      {
        crop: {
          originX: originX,
          originY: originY,
          width: dim,
          height: dim
        }
      },
      {
        resize: {
          width: 2000
        }
      }
    ]);
    const thumbnail = await ImageManipulator.manipulate(resizedImage.uri, [
      { resize: { width: 200 } }
    ]);
    this.camera.resumePreview();
    this.setState({ isTakingPicture: false });
    this.props.navigation.navigate("CreateResponse", {
      image: resizedImage,
      thumbnail: thumbnail,
      request: this.state.request
    });
  };
  toggleFlash() {
    console.log("toggleFlash");
    this.setState({
      flashMode:
        this.state.flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  }
  toggleSide() {
    console.log("toggleSide");
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }
}
