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
    this.state = {
      image: this.props.navigation.getParam("image", null)
    };
  }
  render() {
    let { image } = this.state;
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#424242" }}>
          {this.state.image && (
            <Image
              source={{ uri: image.uri }}
              style={{ flex: 1, height: 400, width: "100%" }}
              resizeMode="center"
            />
          )}
        </View>
        <View>
          <PrimaryButton title="Post" onPress={this.postResponse.bind(this)} />
        </View>
      </ScrollView>
    );
  }
  postResponse = async () => {
    let { image } = this.state;
    let formData = Utils.formDataFromImage(image);
    try {
      let response = await Api.postFile("responseImages", formData);
      let responseJson = await response.json();
      console.log(responseJson);
    } catch (err) {
      console.log(err);
    }
  };
}
