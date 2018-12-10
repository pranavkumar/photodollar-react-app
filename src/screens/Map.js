import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Select location",
    headerTitleStyle: {
      fontWeight: "normal",
      fontSize: 18
    }
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          query={{ key: "AIzaSyCb93X2vjYdxfyFhHZrMG2eYB2dY-b7Vk4" }}
          styles={{
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            }
          }}
          currentLocation={false}
        />
        <MapView
          style={{ width: "100%", height: 360 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </ScrollView>
    );
  }
}
