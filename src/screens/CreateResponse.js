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

    console.log(this.state);
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
  postResponse() {
    let { image } = this.state;
    let data = new FormData();
    let filename = image.uri.split("/").pop();
    let ext = filename.split(".").pop();
    data.append("image", {
      uri: image.uri,
      name: filename,
      type: "image/" + ext
    });
    Api.postFile("responseImages", data)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
