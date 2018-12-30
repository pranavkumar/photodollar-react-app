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

export default class Search extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<View><Text>Search</Text></View>);
  }
}
