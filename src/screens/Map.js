import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Autocomplete from "react-native-autocomplete-input";

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
    // key: "AIzaSyCb93X2vjYdxfyFhHZrMG2eYB2dY-b7Vk4"
    this.state = {
      query: ""
    };
  }
  render() {
    const films = this.state.films;
    const query = this.state.query;
    return (
      <ScrollView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    width: "100%",
    height: 45
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 25
  },
  infoText: {
    textAlign: "center"
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center"
  },
  directorText: {
    color: "grey",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center"
  },
  openingText: {
    textAlign: "center"
  }
});
