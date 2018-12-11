import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

import * as Api from "../services/Api.js";


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
    this.state = {
      query: "",
      placeholderQuery: "Search location...",
      predictions: [],
      selectedPrediction: {},
      showPredictions: true,
      region: {
        latitude: 12.9081,
        longitude: 77.6476,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121
      }
    };
    this._handleQuery = _.debounce(this.handleQuery, 300);
  }
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#BDBDBD"
            }}
          >
            <TextInput
              style={{
                height: 50,
                fontSize: 18,
                paddingLeft: 16,
                paddingRight: 16,
                width: "88%"
              }}
              placeholder={this.state.placeholderQuery}
              onChangeText={this.onChangeText.bind(this)}
              value={this.state.query}
            />
            <View
              style={{
                width: "12%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={this.clearPrediction.bind(this)}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <Ionicons name="md-close" size={20} color="#29B6F6" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {this.state.predictions.length > 0 && this.state.showPredictions && (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: 0,
                  left: 0,
                  backgroundColor: "white",
                  width: "100%",
                  opacity: 1
                }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.predictions}
                renderItem={({ item }) => this.renderPrediction(item)}
              />
            )}
          </View>
        </View>
        <MapView
          style={{ width: "100%", height: 360 }}
          region={this.state.region}
        >
          <Marker
            draggable
            coordinate={this.state.region}
            onDragEnd={() => {}}
          />
        </MapView>
      </ScrollView>
    );
  }
  componentDidMount() {}
  onChangeText(text) {
    this.setState({ query: text, showPredictions: true });
    if (text.length > 2) {
      this._handleQuery(text);
    }
  }

  handleQuery(query) {
    Api.autocomplete(query)
      .then(response => {
        if (response.data && response.data.predictions.length > 0) {
          this.setState(
            update(this.state, {
              predictions: { $set: response.data.predictions }
            })
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderPrediction(prediction) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            minHeight: 45,
            zIndex: 100
          }}
        >
          <TouchableOpacity
            activeOpacity={0.2}
            style={{ width: "100%" }}
            onPress={this.selectPrediction.bind(this, prediction)}
          >
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 8,
                paddingRight: 8,
                opacity: 0.8
              }}
            >
              {this.formatString(prediction.description, 50)}
            </Text>
          </TouchableOpacity>
        </View>
        <Separator style={{ marginBottom: 0, marginTop: 0 }} />
      </View>
    );
  }
  selectPrediction(prediction) {
    console.log("selected " + prediction.description);
    Keyboard.dismiss();
    this.setState(
      update(this.state, {
        selectedPrediction: { $set: prediction },
        showPredictions: { $set: false },
        query: { $set: this.formatString(prediction.description, 30) }
      })
    );
    this.focusPrediction.call(this, prediction.description);
  }
  formatString(str, length) {
    if (str.length < length) {
      return str;
    } else {
      return str.substring(0, length - 3) + "...";
    }
  }
  focusPrediction(prediction) {
    Api.geocode(prediction)
      .then(response => {
        if (response.data.results[0] != undefined) {
          let result = response.data.results[0];
          let location = result.geometry.location;
          this.setState(
            update(this.state, {
              region: {
                latitude: { $set: location.lat },
                longitude: { $set: location.lng }
              }
            })
          );
        } else {
          console.log(response.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  clearPrediction() {
    this.setState(
      update(this.state, {
        predictions: { $set: [] },
        selectedPrediction: { $set: {} },
        showPredictions: { $set: true },
        query: { $set: "" }
      })
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
