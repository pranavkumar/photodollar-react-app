import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton, Separator } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import * as Api from "../services/Api";
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
    let mockLocation = {
      addressLine1: "1st a main road, 15th cross",
      addressLine2: "HSR Layout, Sector 6",
      city: "Bengaluru",
      country: "Karnataka",
      lat: 12.9081,
      lng: 77.6476,
      latDelta: 0.0222,
      lngDelta: 0.0121,
      isSelected: false,
      isCurrent: true
    };
    this.state = {
      uUserId: props.navigation.getParam("uUserId", "5c11ff3f19d3da6e905ec39c"),
      title: "",
      placeholderTitle: "Request title e.g. A drowsy cat",
      refresh: false,
      fontLoaded: false,
      sourceLocation: props.navigation.getParam("sourceLocation", mockLocation),
      destLocation: props.navigation.getParam("sourceLocation", mockLocation)
    };
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentWillMount = async () => {
    await this.loadFonts();
    this.setState({ fontLoaded: true });
  };
  componentWillReceiveProps(props) {
    let navigation = props.navigation;
    let location = navigation.getParam("location", null);
    if (location) {
      this.setState(update(this.state, { destLocation: { $set: location } }));
    }
  }
  render() {
    if (!this.state.fontLoaded) return null;
    let { sourceLocation, destLocation } = this.state;
    return (
      <View keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: 60,
            backgroundColor: "#EEEEEE",
            padding: 16,
            paddingBottom: 20
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
                Create request
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <View style={{ marginBottom: 8 }}>
            <TextInput
              style={{
                height: 45,
                borderBottomWidth: 1,
                fontSize: 18,
                borderBottomColor: "#BDBDBD",
                fontFamily: "regular"
              }}
              placeholder={this.state.placeholderTitle}
              onChangeText={text => this.setState({ title: text })}
              value={this.state.title}
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "100%" }}>
                <Text style={{ fontFamily: "regular", fontSize: 16 }}>
                  To location
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 8 }}>
              {this.renderLocation(destLocation)}
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderLocation(item, index) {
    return (
      <View style={styles.locationLabel}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%"
            }}
          >
            <View style={{ width: "100%" }}>
              <Text style={{ fontFamily: "regular", color: "#757575" }}>
                {item.addressLine1}
              </Text>
              <Text style={{ fontFamily: "regular", color: "#757575" }}>
                {item.addressLine2}
              </Text>
              <Text style={{ fontFamily: "regular", color: "#757575" }}>
                {item.city}
              </Text>
            </View>
          </View>
          <View style={{ width: "30%", paddingTop: "1%" }}>
            <TouchableOpacity
              onPress={this.gotoMap.bind(this)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontFamily: "regular", color: "#1E88E5" }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <TouchableOpacity
            onPress={this.postRequest.bind(this)}
            style={{
              minWidth: 70,
              height: 35,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#E64A19",
              alignItems: "center",
              justifyContent: "center",
              padding: 8
            }}
          >
            <Text
              style={{
                borderWidth: 0,
                color: "#E64A19",
                fontFamily: "regular"
              }}
            >
              POST REQUEST
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  gotoMap() {
    if (this.props.navigation) {
      this.props.navigation.navigate("Map", { from: "CreateRequest" });
    }
  }
  postRequest() {
    let { uUserId, title, sourceLocation, destLocation } = this.state;
    let request = {};
    request = {
      UUserId: uUserId,
      title,
      _to: destLocation,
      _from: sourceLocation
    };

    console.log(request);
    Api.postRequest(request)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  categoryLabel: {
    margin: 2,
    borderRadius: 2,
    padding: 0,
    borderWidth: 1,
    borderColor: "#29B6F6"
  },
  categoryLabelText: {
    fontSize: 18,
    color: "#424242"
  },
  categoryLabelSelected: {
    margin: 2,
    borderRadius: 2,
    padding: 0,
    backgroundColor: "#29B6F6",
    borderWidth: 1,
    borderColor: "#29B6F6"
  },
  categoryLabelTextSelected: {
    fontSize: 18,
    color: "#FAFAFA"
  },
  locationRadio: {
    borderRadius: 10,
    borderColor: "#42A5F5",
    width: 16,
    height: 16,
    borderWidth: 1
  },
  locationRadioSelected: {
    borderRadius: 10,
    borderColor: "#42A5F5",
    width: 16,
    height: 16,
    borderWidth: 1,
    backgroundColor: "#42A5F5"
  }
});
