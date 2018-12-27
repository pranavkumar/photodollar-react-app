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
    this.state = {
      UUserId: "5c11ff3f19d3da6e905ec39c",
      title: "",
      placeholderTitle: "Request title e.g. A drowsy cat",
      refresh: false,
      fontLoaded: false,
      locations: [
        {
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
        }
      ]
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
      this.state.locations.map((location, i) => {
        location.isSelected = false;
        this.setState(
          update(this.state, { locations: { i: { $set: location } } })
        );
      });
      location.isSelected = true;
      location.isCurrent = false;
      this.setState(update(this.state, { locations: { $push: [location] } }));
    }
  }
  render() {
    if (!this.state.fontLoaded) return null;
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
            <View style={{ width: "88%" }}>
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
            <View
              style={{
                width: "12%",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                disabled={false}
                onPress={this.postRequest.bind(this)}
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{ color: "#29B6F6", fontSize: 14, fontWeight: "bold" }}
                >
                  DONE
                </Text>
              </TouchableOpacity>
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
                <Text style={{ fontFamily: "regular",fontSize:16 }}>To location</Text>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
              <FlatList
                extraData={this.state.refresh}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item, index) => index.toString()}
                data={this.state.locations}
                renderItem={({ item, index }) =>
                  this.renderLocation(item, index)
                }
              />
              <View>
                <TouchableHighlight
                  onPress={this.gotoMap.bind(this)}
                  underlayColor="#F5F5F5"
                  style={{ height: 45, justifyContent: "center" }}
                >
                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <Ionicons name="ios-pin" size={20} color="#BDBDBD" />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#42A5F5",
                        marginLeft: 8,
                        marginRight: 8,
                        fontSize: 16
                      }}
                    >
                      SELECT FROM MAP
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <Separator />
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderLocation(item, index) {
    return (
      <View style={styles.locationLabel}>
        <TouchableOpacity
          onPress={this.toggleSelectLocation.bind(this, item, index)}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "92%"
              }}
            >
              <View style={{ width: "65%" }}>
                <Text style={{ fontFamily: "regular" }}>
                  {item.addressLine1}
                </Text>
                <Text style={{ fontFamily: "regular" }}>
                  {item.addressLine2}
                </Text>
                <Text style={{ fontFamily: "regular" }}>{item.city}</Text>
              </View>
              <View style={{ paddingRight: 8, width: "35%" }}>
                {item.isCurrent && (
                  <Text style={{ fontFamily: "regular" }}>Current</Text>
                )}
              </View>
            </View>
            <View style={{ width: "8%", paddingTop: "1%" }}>
              <View
                style={
                  item.isSelected
                    ? styles.locationRadioSelected
                    : styles.locationRadio
                }
              />
            </View>
          </View>
          <Separator />
        </TouchableOpacity>
      </View>
    );
  }

  toggleSelectLocation(item, index) {
    this.state.locations.map((location, i) => {
      location.isSelected = false;
      this.setState(
        update(this.state, { locations: { i: { $set: location } } })
      );
    });
    item.isSelected = !item.isSelected;
    this.setState(update(this.state, { locations: { index: { $set: item } } }));
  }
  gotoMap() {
    this.props.navigation.navigate("Map", { from: "CreateRequest" });
  }
  postRequest() {
    console.log("postRequest");
    let request = {};
    request.UUserId = this.state.UUserId;
    request.title = this.state.title;
    request.categoryIds = [];
    this.state.categories.forEach(category => {
      if (category.isSelected) {
        request.categoryIds.push(category.id);
      }
    });
    this.state.locations.forEach(location => {
      if (location.isSelected) {
        request._to = location;
      }
      if (location.isCurrent) {
        request._from = location;
      }
    });
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
