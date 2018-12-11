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
      showPredictions: true
    };
    this._handleQuery = _.debounce(this.handleQuery, 500);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            style={{
              height: 50,
              borderBottomWidth: 1,
              fontSize: 18,
              paddingLeft: 8,
              paddingRight: 8,
              borderBottomColor: "#BDBDBD"
            }}
            placeholder={this.state.placeholderQuery}
            onChangeText={this.onChangeText.bind(this)}
            value={this.state.query}
          />
          <View>
            {this.state.predictions.length > 0 && this.state.showPredictions && (
              <FlatList
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
  componentDidMount() {}
  onChangeText(text) {
    this.setState({ query: text,showPredictions:true });
    if (text.length > 2) {
      this._handleQuery(text);
    }
  }

  handleQuery(query) {
    console.log(query);
    Api.autocomplete(query)
      .then(response => {
        console.log(response.data);
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
          style={{ flexDirection: "row", alignItems: "center", minHeight: 45 }}
        >
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={this.selectPrediction.bind(this, prediction)}
          >
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              {prediction.description.substring(0, 50)}
            </Text>
          </TouchableOpacity>
        </View>
        <Separator style={{ marginBottom: 0, marginTop: 0 }} />
      </View>
    );
  }
  selectPrediction(prediction) {
    console.log("selected " + prediction.description);
    this.setState(
      update(this.state, {
        selectedPrediction: { $set: prediction },
        showPredictions: { $set: false },
        query: { $set: prediction.description }
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
