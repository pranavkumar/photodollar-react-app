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
      title: "",
      placeholderTitle: "Request title e.g. A drowsy cat",
      refresh: false,
      categories: [
        { title: "Politics", followersCount: 1000, isSelected: true },
        { title: "Sports", followersCount: 500, isSelected: false },
        { title: "Fashion", followersCount: 900, isSelected: false },
        { title: "Food and Drink", followersCount: 788, isSelected: false },
        { title: "Music and Movies", followersCount: 345, isSelected: false },
        { title: "Gaming", followersCount: 345, isSelected: false },
        { title: "Education", followersCount: 100, isSelected: false }
      ],
      locations: [
        {
          addressLine1: "8069 Foxrun Rd",
          addressLine2: "West Hempstead",
          city: "NY",
          country: "US",
          lat: 22.34,
          lng: 77.45,
          latDelta: 0.009,
          lngDelta: 0.003,
          isSelected: false,
          isCurrent: true
        }
      ]
    };
  }
  componentWillReceiveProps(props) {
    let navigation = props.navigation;
    let location = navigation.getParam("location", null);
    if (location) {
      console.log(location);
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
    return (
      <ScrollView style={{ padding: 8 }} keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: 55,
            marginTop: 24,
            padding: 16,
            paddingBottom: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "88%" }}>
              <Text style={{ fontSize: 18, color: "#29B6F6" }}>
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
        <View style={{ marginBottom: 8 }}>
          <TextInput
            style={{
              height: 45,
              borderBottomWidth: 1,
              fontSize: 18,
              borderBottomColor: "#BDBDBD"
            }}
            placeholder={this.state.placeholderTitle}
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "8%" }}>
              <Ionicons name="md-bookmark" size={20} color="#BDBDBD" />
            </View>
            <View style={{ width: "92%" }}>
              <Text>Select categories (at least 1)</Text>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              extraData={this.state.refresh}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.categories}
              renderItem={({ item }) => this.renderCategory(item)}
            />
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "8%" }}>
              <Ionicons name="ios-locate" size={20} color="#BDBDBD" />
            </View>
            <View style={{ width: "92%" }}>
              <Text>Select location</Text>
            </View>
          </View>

          <View style={{ marginTop: 8 }}>
            <FlatList
              extraData={this.state.refresh}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item, index) => index.toString()}
              data={this.state.locations}
              renderItem={({ item, index }) => this.renderLocation(item, index)}
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
      </ScrollView>
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
                <Text style={{ color: "#616161" }}>{item.addressLine1}</Text>
                <Text style={{ fontWeight: "bold" }}>{item.addressLine2}</Text>
                <Text style={{ fontWeight: "bold" }}>{item.city}</Text>
              </View>
              <View style={{ paddingRight: 8, width: "35%" }}>
                {item.isCurrent && (
                  <Text style={{ fontWeight: "bold" }}>Current</Text>
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
  renderCategory(item) {
    return (
      <View
        style={
          !item.isSelected ? styles.categoryLabel : styles.categoryLabelSelected
        }
      >
        <TouchableHighlight
          style={{ padding: 6 }}
          underlayColor="#29B6F6"
          onPress={this.toggleSelectCategory.bind(this, item)}
        >
          <Text
            style={
              !item.isSelected
                ? styles.categoryLabelText
                : styles.categoryLabelTextSelected
            }
          >
            {item.title}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  toggleSelectCategory(item) {
    let index = _.findIndex(this.state.categories, function(o) {
      return o.title == item.title;
    });
    item.isSelected = !item.isSelected;
    this.setState(
      update(this.state, {
        categories: { index: { $set: item } },
        refresh: { $set: !this.state.refresh }
      })
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
