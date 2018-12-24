import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import * as Util from "../utils";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions, Contacts } from "expo";
import * as Utils from "../services/Utils";
import * as _ from "lodash";

export default class ForwardRequest extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }
  componentDidMount = async () => {
    let contacts = await Utils.getContacts();
    this.setState(update(this.state, { contacts: { $set: contacts } }));
  };
  render() {
    return (
      <View>
        <View style={{ height: 60, backgroundColor: "#448AFF", padding: 16 }}>
          <Text style={{ fontSize: 18, color: "white" }}>Forward Request</Text>
        </View>
        <FlatList
          style={{ paddingTop: 16 }}
          extraData={this.state.refresh}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.contacts}
          renderItem={({ item, index }) => this.renderContact(item, index)}
        />
      </View>
    );
  }
  renderContact(contact) {
    // console.log(contact);
    return (
      <View style={{ height: 60, paddingLeft: 8, paddingRight: 8 }}>
        <TouchableOpacity onPress={() => {}} style={{ width: "100%" }}>
          <Text style={{ fontSize: 16 }}>{contact.name || "Unknown"}</Text>
          {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
            <Text>{contact.phoneNumbers[0].number}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
