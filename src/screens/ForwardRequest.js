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
import { Card, Avatar, Button } from "react-native-elements";
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
      uRequestId: props.navigation.getParam(
        "uRequestId",
        "5c12015d1781236f919ca834"
      ),
      uUserId: props.navigation.getParam("uUserId", "5c11ff3f19d3da6e905ec39c"),
      contactsForwarded: [],
      contactsNotForwarded: [],
      refresh: false
    };
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount = async () => {
    let { uUserId, uRequestId } = this.state;
    try {
      let { status, data } = await Api.getForwardables(uUserId, uRequestId);
      let contacts = data;

      let contactsNotForwarded = _.filter(contacts, contact => {
        return !contact.isForwarded;
      });

      let contactsForwarded = _.filter(contacts, contact => {
        return contact.isForwarded;
      });

      this.setState(
        update(this.state, {
          contactsNotForwarded: { $set: contactsNotForwarded.slice(0, 5) },
          contactsForwarded: { $set: contactsForwarded }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (!this.state.fontLoaded) return null;
    let { contactsNotForwarded, contactsForwarded } = this.state;
    return (
      <View>
        <View
          style={{
            height: 60,
            backgroundColor: "#EEEEEE",
            padding: 16,
            flexDirection: "row"
          }}
        >
          <View style={{ width: "65%" }}>
            <Text
              style={{ fontSize: 18, color: "#616161", fontFamily: "regular" }}
            >
              Forward Request
            </Text>
          </View>
          <View
            style={{
              width: "35%",
              justifyContent: "center",
              flexDirection: "column"
            }}
          />
        </View>
        {contactsForwarded.length > 0 && (
          <View style={{ padding: 8 }}>
            <Text style={{ fontFamily: "regular" }}>{`Forwarded(${
              contactsForwarded.length
            })`}</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ paddingTop: 16 }}
              extraData={this.state.refresh}
              keyExtractor={(item, index) => index.toString()}
              data={contactsForwarded}
              renderItem={({ item, index }) =>
                this.renderContactForwarded(item, index)
              }
            />
          </View>
        )}

        <FlatList
          style={{ paddingTop: 16 }}
          extraData={this.state.refresh}
          keyExtractor={(item, index) => index.toString()}
          data={contactsNotForwarded}
          renderItem={({ item, index }) =>
            this.renderContactNotForwarded(item, index)
          }
        />
      </View>
    );
  }
  renderContactForwarded(contact, index) {
    return (
      <View
        style={{
          height: 60,
          paddingLeft: 8,
          paddingRight: 8,
          flexDirection: "column"
        }}
      >
        <Text style={{ fontFamily: "regular" }}>{contact.name}</Text>
        <Text style={{ fontFamily: "regular" }}>
          {contact.normalizedMobile}
        </Text>
      </View>
    );
  }
  renderContactNotForwarded(contact, index) {
    return (
      <View
        style={{
          height: 60,
          paddingLeft: 8,
          paddingRight: 8,
          flexDirection: "row"
        }}
      >
        <View style={{ width: "70%" }}>
          <Text style={{ fontSize: 16, fontFamily: "regular" }}>
            {contact.name || "Unknown"}
          </Text>
          <Text style={{ fontFamily: "regular" }}>
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
          {!contact.isForwarded ? (
            <TouchableOpacity
              onPress={this.handleForward.bind(this, contact, index)}
            >
              <Text style={{ fontFamily: "semiBold", color: "#1E88E5" }}>
                Forward
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ fontFamily: "regular" }}>Forwarded</Text>
          )}
        </View>
      </View>
    );
  }
  handleForward = async (contact, index) => {
    console.log("forwarding");
    if (contact.isForwarded) return;
    let { uUserId, uRequestId, refresh } = this.state;
    let forward = _.cloneDeep(contact);

    forward.receiverId = forward.uUserId;
    forward.forwarderId = uUserId;
    forward.contactId = forward.id;
    delete forward.uUserId;
    delete forward.id;
    delete forward.isForwarded;

    try {
      let { status, data } = await Api.postForwards(uRequestId, forward);
      console.log(data);
      if ((status = 200 && data == true)) {
        contact.isForwarded = true;
        this.setState(
          update(this.state, {
            contactsNotForwarded: { index: { $set: contact } },
            refresh: { $set: !refresh }
          })
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
}
