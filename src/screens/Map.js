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
  Keyboard,
  Platform,
  StatusBar
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";
import { Ionicons, EvilIcons,MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import * as Api from "../services/Api.js";
import * as Utils from "../services/Utils";

export default class Home extends React.Component {
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
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  render() {
    let { fontLoaded } = this.state;
    if (!fontLoaded) return null;

    return (
      <View style={styles.container} keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: 60,
            padding: 16,
            paddingBottom: 20,
            backgroundColor: "#EEEEEE"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#616161",
                  fontFamily: "regular"
                }}
              >
                Select Location
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                disabled={
                  this.state.selectedPrediction.description == undefined ||
                  this.state.selectedPrediction.description == null
                }
                onPress={this.onLocationSelected.bind(this)}
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    color: "#1E88E5",
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "regular"
                  }}
                >
                  DONE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
                width: "88%",
                fontFamily: "regular"
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
                <Ionicons name="md-close" size={20} color="#1E88E5" />
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
          style={{ width: "100%", height: "100%", alignSelf: "flex-end" }}
          region={this.state.region}
        >
          <Marker draggable coordinate={this.state.region} onDragEnd={() => {}}>
            <View style={{ width: 50, height: 50, backgroundColor: "transparent",alignItems:"center",justifyContent:"center" }}>
              <MaterialIcons name="location-on" size={50} color="#E64A19" />
            </View>
          </Marker>
        </MapView>
      </View>
    );
  }

  onLocationSelected() {
    let { navigation } = this.props;
    let from = navigation.getParam("from", null);
    if (!from) return;
    let { selectedPrediction, region } = this.state;
    selectedPrediction.region = region;
    navigation.navigate(from, {
      location: this.serializeLocation(selectedPrediction)
    });
  }
  serializeLocation(prediction) {
    let location = {};
    location.description = prediction.description;
    location.lat = prediction.region.latitude;
    location.lng = prediction.region.longitude;
    location.latDelta = prediction.region.latitudeDelta;
    location.lngDelta = prediction.region.longitudeDelta;
    location.country = prediction.terms[prediction.terms.length - 1].value;
    location.addressLine1 =
      prediction.terms[0].value + ", " + prediction.terms[1].value;
    location.addressLine2 = [];
    for (var i = 2; i < prediction.terms.length; i++) {
      location.addressLine2.push(prediction.terms[i].value);
    }
    location.addressLine2 = location.addressLine2.join(", ");
    location.placeId = prediction.place_id;
    return location;
  }
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
            minHeight: 50,
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
                opacity: 0.8,
                fontFamily: "regular"
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
