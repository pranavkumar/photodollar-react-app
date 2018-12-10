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

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Create Request",
    headerTitleStyle: {
      fontWeight: "normal",
      fontSize: 18
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      placeholderTitle: "Request title e.g. A drowsy cat",
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
          isSelected: false,
          isCurrent: true
        },
        {
          addressLine1: "15 Selby St.",
          addressLine2: "Oak Creek",
          city: "WI",
          country: "US",
          isSelected: false,
          isCurrent: false
        },
        {
          addressLine1: "8069 Foxrun Rd",
          addressLine2: "West Hempstead",
          city: "NY",
          country: "US",
          isSelected: false,
          isCurrent: false
        }
      ]
    };
  }
  render() {
    return (
      <ScrollView style={{ padding: 8 }}>
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
              renderItem={({ item }) => this.renderCategories(item)}
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
              keyExtractor={(item, index) => index.toString()}
              data={this.state.locations}
              renderItem={({ item }) => this.renderLocations(item)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  renderLocations(item) {
    return (
      <View style={styles.locationLabel}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "8%", paddingTop: "1%" }}>
            <View
              style={{
                borderRadius: 10,
                borderColor: "#42A5F5",
                width: 16,
                height: 16,
                borderWidth: 1
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "92%"
            }}
          >
            <View>
              <Text style={{ color: "#616161" }}>{item.addressLine1}</Text>
              <Text style={{ fontWeight: "bold" }}>{item.addressLine2}</Text>
              <Text style={{ fontWeight: "bold" }}>{item.city}</Text>
            </View>
            <View style={{ paddingRight: 8 }}>
              {item.isCurrent && (
                <Text style={{ fontWeight: "bold" }}>Current</Text>
              )}
            </View>
          </View>
        </View>
        <Separator />
      </View>
    );
  }
  renderCategories(item) {
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
    console.log(item);
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
  locationLabel: {}
});
