import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import update from "immutability-helper";
import * as _ from "lodash";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { title: "Politics", followersCount: 1000, isSelected: false },
        { title: "Sports", followersCount: 500, isSelected: false },
        { title: "Fashion", followersCount: 900, isSelected: false },
        { title: "Food and Drink", followersCount: 788, isSelected: false },
        { title: "Music and Movies", followersCount: 345, isSelected: false },
        { title: "Gaming", followersCount: 345, isSelected: false },
        { title: "Education", followersCount: 100, isSelected: false }
      ],
      refresh: false
    };
  }
  render() {
    return (
      <ScrollView style={{ margin: 8 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 22 }}>What would you like to cover?</Text>
        <Text>Select at least 3 categories.</Text>
        <View style={styles.categoriesContainer}>
          <FlatList
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.categories}
            renderItem={({ item }) => this.renderCategories(item)}
          />
        </View>
      </ScrollView>
    );
  }
  renderCategories(item) {
    return (
      <TouchableHighlight onPress={this.toggleSelectCategory.bind(this, item)}>
        <View
          style={
            item.isSelected
              ? styles.categoryContainerSelected
              : styles.categoryContainer
          }
        >
          <Text style={styles.categoryLabel}>{item.title}</Text>
          <View style={styles.categoryInfoContainer}>
            <Text style={styles.followersCount}>
              {item.followersCount} following.
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  toggleSelectCategory(item) {
    let index = _.findIndex(this.state.categories, function(compare) {
      return compare.title === item.title;
    });
    item.isSelected = !item.isSelected;
    this.setState(
      update(this.state, {
        categories: { index: { $set: item } },
        refresh: { $set: !this.state.refresh }
      })
    );
  }
}

const styles = StyleSheet.create({
  categoryLabel: {
    fontSize: 22,
    color: "#FF5722"
  },
  categoryContainer: {
    margin: 0,
    marginBottom: 10,
    padding: 8
  },
  categoryContainerSelected: {
    margin: 0,
    marginBottom: 10,
    padding: 8,

    backgroundColor: "#EEEEEE"
  },
  categoriesContainer: {
    marginTop: 16
  },
  categoryInfoContainer: {
    flexDirection: "row"
  },
  followersCount: {
    color: "#9E9E9E"
  }
});
