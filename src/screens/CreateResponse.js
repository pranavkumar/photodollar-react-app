import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
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
    let mockImage = {
      cancelled: false,
      height: 1200,
      type: "image",
      uri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540pranav.fullstack%252Fapp/ImagePicker/557e48d1-6da8-4b9c-a0cd-b0f4cb1f32fe.jpg",
      width: 750
    };
    //image: this.props.navigation.getParam("image", null)
    let { height, width } = Dimensions.get("window");
    this.state = {
      image: this.props.navigation.getParam("image", null),
      comment: null,
      placeholderComment: "Optional comment...",
      UUserId: "5c10b94950726f47d9c1a626",
      height: height,
      width: width
    };
  }
  render() {
    let { image } = this.state;
    let screen = ({ height, width } = this.state);
    let { width, height } = this.getImageDimensions(image, screen);
    // console.log(this.getImageDimensions(image, screen));
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#424242" }}>
          {this.state.image && (
            <Image
              source={{ uri: image.uri }}
              style={{ flex: 1, height: height, width: width }}
            />
          )}
        </View>
        <View>
          <TextInput
            style={{
              height: 45,
              borderBottomWidth: 1,
              fontSize: 18,
              borderBottomColor: "#BDBDBD",
              marginLeft: 8,
              marginRight: 8
            }}
            placeholder={this.state.placeholderComment}
            onChangeText={text => this.setState({ comment: text })}
            value={this.state.comment}
          />
          <PrimaryButton
            title="Post"
            onPress={this.postResponse.bind(this)}
            buttonStyle={{ backgroundColor: "#42A5F5" }}
          />
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
      let { comment, UUserId } = this.state;
      let { data } = await Api.postResponse({
        comment: comment,
        UUserId: UUserId,
        image: firstImage
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}
