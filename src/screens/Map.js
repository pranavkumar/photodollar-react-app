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
  render() {
    return (
      <ScrollView>
        <Text>Map</Text>
      </ScrollView>
    );
  }
}
