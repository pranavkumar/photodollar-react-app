import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";

import * as Utils from "../services/Utils";
import * as Api from "../services/Api";

import update from "immutability-helper";
import RequestActions from "../components/RequestActions";
import { PrimaryButton, Separator } from "../components/CommonUI";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      refresh: false,
      uUserId: props.uUserId || null
    };
    
  }
  componentWillReceiveProps = async props => {
    await this.setState(
      update(this.state, {
        uUserId: { $set: props.uUserId },
        refresh: { $set: !this.state.refresh }
      })
    );

    await this.loadFeed.bind(this)();
  };
  componentDidMount = async () => {
    await this.loadFeed.bind(this)();
  };
  loadFeed = async () => {
    let { uUserId } = this.state;
    if (!uUserId) return;
    try {
      let { status, data } = await Api.getFeed(uUserId);
      console.log(status);
      if (status == 200) {
        this.setState(update(this.state, { requests: { $set: data } }));
      }
    } catch (e) {
    } finally {
    }
  };
  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        extraData={this.state.refresh}
        keyExtractor={(item, index) => index.toString()}
        data={this.state.requests}
        renderItem={({ item, index }) => this.renderRequest(item, index)}
      />
    );
  }
  renderRequest(item, index) {
    return (
      <View style={{ margin: 0, marginTop: 10, paddingBottom: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 16,
              marginBottom: 8,
              alignItems: "center",
              height: 35
            }}
          >
            <View
              style={{
                width: "15%",
                backgroundColor: "#F5F5F5",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                height: 35
              }}
            >
              <Text style={{ fontFamily: "regular", fontSize: 16 }}>12k</Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "normal",
                fontFamily: "regular",
                width: "85%",
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              {item.title}
            </Text>
          </View>
        </View>
        {(!item.UResponses || item.UResponses.length == 0) &&
          this.renderObjectives(item)}
        {item.UResponses &&
          item.UResponses.length > 0 &&
          this.renderResponses(item.UResponses)}

        <RequestActions
          uRequestId={item.id}
          uUserId={item.UUserId}
          isExpecting={item.isExpecting}
          onForward={this.handleForward.bind(this, item)}
          onReply={this.handleReply.bind(this, item)}
        />
        <Separator />
      </View>
    );
  }
  renderObjectives(request) {
    let { _from, _to } = request;
    return (
      <View style={{ padding: 16 }}>
        <View
          style={{ backgroundColor: "#EEEEEE", borderRadius: 4, padding: 8 }}
        >
          <Text style={{ fontFamily: "regular" }}>
            {`Do you know someone around ${_to.addressLine1}?`}
          </Text>
          <Text
            style={{ color: "#1E88E5", fontFamily: "semiBold", fontSize: 14 }}
          >
            Forward Post +50 pts.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#EEEEEE",
            borderRadius: 4,
            padding: 8,
            marginTop: 8
          }}
        >
          <Text style={{ fontFamily: "regular" }}>
            {`Be the first one to reply.`}
          </Text>
          <Text
            style={{ color: "#1E88E5", fontFamily: "semiBold", fontSize: 14 }}
          >
            Reply Post +50 pts.
          </Text>
        </View>
      </View>
    );
  }
  renderResponses(items) {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item }) => this.renderResponse(item)}
      />
    );
  }
  renderResponse(item) {
    return (
      <View style={{ marginBottom: 32, marginRight: 16, marginLeft: 16 }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontFamily: "regular", marginTop: 8, fontSize: 16 }}>
            {item.comment || "No comment available"}
          </Text>
          <Text style={{ fontFamily: "regular", color: "#BDBDBD" }}>
            {item.createdAt}
          </Text>
        </View>
      </View>
    );
  }
  handleReply = async request => {
    this.props.navigation.navigate("CameraReply", { request: request });
  };
  handleForward = async request => {
    console.log("Forwarding...");
    this.props.navigation.navigate("ForwardRequest", {
      URequestId: request.id
    });
  };
}
