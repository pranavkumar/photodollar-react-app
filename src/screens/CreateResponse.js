import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions } from "expo";
import * as Utils from "../services/Utils";

export default class CreateResponse extends React.Component {
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
    // let mockImage = {
    //   cancelled: false,
    //   height: 420,
    //   type: "image",
    //   uri:
    //     "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540pranav.fullstack%252Fapp/ImagePicker/84fd529a-9686-4b34-9f5f-fb02ac518712.jpg",
    //   width: 480
    // };
    //image: this.props.navigation.getParam("image", null)
    let { height, width } = Dimensions.get("window");
    let { navigation } = this.props;
    let image = navigation.getParam("image", null);
    let request = navigation.getParam("request", null);

    this.state = {
      image,
      comment: null,
      placeholderComment: "Optional comment...",
      height,
      width,
      isShowingOptions: false,
      request
    };

    // console.log(this.state);
  }
  render() {
    let { image, isShowingOptions, request } = this.state;
    let screen = ({ height, width } = this.state);
    let { width, height } = this.getImageDimensions(image, screen);

    // console.log(this.getImageDimensions(image, screen));
    return (
      <ScrollView>
        <View
          style={{ backgroundColor: "#424242", width: width, height: height }}
        >
          {this.state.image && (
            <ImageBackground
              style={{
                height: height,
                width: width,
                alignItems: "flex-end",
                flexDirection: "row"
              }}
              source={{ uri: image.uri }}
            >
              <View
                style={{
                  height: 60,
                  width: width,
                  backgroundColor: "#424242",
                  opacity: 0.9,
                  padding: 8
                }}
              >
                <Text style={{ color: "#42A5F5", fontSize: 16 }}>
                  {request.title}
                </Text>
                <Text style={{ color: "#F5F5F5", fontSize: 14 }}>
                  By {`${request.UUser.firstname} ${request.UUser.lastname}`}
                </Text>
              </View>
            </ImageBackground>
          )}
        </View>
        <View style={{ marginLeft: 8, marginRight: 8 }}>
          <TextInput
            style={{
              height: 45,
              borderBottomWidth: 1,
              fontSize: 18,
              borderBottomColor: "#BDBDBD",
              marginBottom: 8
            }}
            placeholder={this.state.placeholderComment}
            onChangeText={text => this.setState({ comment: text })}
            value={this.state.comment}
          />
          <View style={{ marginBottom: 8 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isShowingOptions: !isShowingOptions });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ color: "#616161" }}>View more options</Text>
                <Ionicons
                  name={isShowingOptions ? "ios-arrow-up" : "ios-arrow-down"}
                  size={16}
                  color="#424242"
                  style={{ marginRight: 8 }}
                />
              </View>
            </TouchableOpacity>
            {isShowingOptions && (
              <View style={{ marginTop: 8 }}>
                <Text>Some options</Text>
              </View>
            )}
          </View>
          <Separator />
          <View style={{ alignItems: "center" }}>
            <PrimaryButton
              title="Post Reply"
              onPress={this.postResponse.bind(this)}
              containerStyle={{ width: 150 }}
              buttonStyle={{
                backgroundColor: "#42A5F5",
                borderRadius: 16,
                width: "100%",
                height: 35
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  getImageDimensions(image, screen) {
    return {
      height: (image.height / image.width) * screen.width,
      width: screen.width
    };
  }

  postResponse = async () => {
    let { image } = this.state;
    let formData = Utils.formDataFromImage(image);
    try {
      let imageResponse = await Api.postFile("responseImages", formData);
      let {
        result: {
          files: {
            image: [firstImage]
          }
        }
      } = await imageResponse.json();
      let { comment, request } = this.state;
      let { data } = await Api.postResponse({
        comment,
        UUserId: "1234",
        requestId: request.id,
        image: firstImage
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}
