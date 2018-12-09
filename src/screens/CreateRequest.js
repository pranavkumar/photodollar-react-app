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
  render() {
    return (
      <ScrollView style={{padding:8}}>
        <Text>Create a request</Text>
      </ScrollView>
    );
  }
}
