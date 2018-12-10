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
import { PrimaryButton } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";

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
          <Text>Suggest categories (at least 1)</Text>
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
      </ScrollView>
    );
  }
  renderCategories(item) {
    return (
      <TouchableHighlight onPress={this.toggleSelectCategory.bind(this, item)}>
        <View
          style={
            !item.isSelected
              ? styles.categoryLabel
              : styles.categoryLabelSelected
          }
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
        </View>
      </TouchableHighlight>
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
    padding: 6,
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
    padding: 6,
    backgroundColor: "#29B6F6",
    borderWidth: 1,
    borderColor: "#29B6F6"
  },
  categoryLabelTextSelected: {
    fontSize: 18,
    color: "#FAFAFA"
  }
});
