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
import { PrimaryButton, CheckBox } from "../components/CommonUI";
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

    this.state = {
      contacts: [],
      UUserId: "5c11ff3f19d3da6e905ec39c",
      refresh: false,
      countSelected: 0
    };
  }
  componentDidMount = async () => {
    // let contacts = await Utils.getContacts();
    // this.setState(update(this.state, { contacts: { $set: contacts } }));
    try {
      let { status, data } = await Api.getForwardables(this.state.UUserId);
      console.log(status);
      let contacts = data;
      contacts = _.map(contacts, contact => {
        contact.isSelected = false;
        return contact;
      });
      this.setState(
        update(this.state, { contacts: { $set: data.slice(0, 5) } })
      );
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <View>
        <View style={{ height: 70, backgroundColor: "#448AFF", padding: 16 }}>
          <Text style={{ fontSize: 18, color: "white" }}>Forward Request</Text>
          <Text style={{ fontSize: 16 }}>{`${
            this.state.countSelected
          } contacts selected.`}</Text>
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
  renderContact(contact, index) {
    return (
      <View
        style={{
          height: 60,
          paddingLeft: 8,
          paddingRight: 8,
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={this.toggleSelectContact.bind(this, contact, index)}
          style={{ width: "100%", flexDirection: "row" }}
        >
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 16 }}>{contact.name || "Unknown"}</Text>
            <Text>
              {contact.normalizedMobile != 0
                ? contact.normalizedMobile
                : "Unknown mobile no"}
            </Text>
          </View>
          <View
            style={{
              width: "30%",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <CheckBox isChecked={contact.isSelected} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  toggleSelectContact(contact, index) {
    console.log(`toggling isSelected for ${index}`);
    contact.isSelected = !contact.isSelected;
    let change = contact.isSelected ? 1 : -1;
    this.setState(
      update(this.state, {
        contacts: { index: { $set: contact } },
        refresh: { $set: !this.state.refresh },
        countSelected: { $set: this.state.countSelected + change }
      })
    );
  }
}
