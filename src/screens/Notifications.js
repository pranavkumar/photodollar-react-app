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

export default class Notifications extends React.Component {
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
    this.state = {};
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };

  render() {
    let { fontLoaded } = this.state;
    if (!fontLoaded) {
      return null;
    }
    return (
      <View>
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
                Notifications
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
