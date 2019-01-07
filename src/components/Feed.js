import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Share,
  ScrollView
} from "react-native";

import * as Utils from "../services/Utils";
import * as Api from "../services/Api";

import update from "immutability-helper";
import RequestActions from "../components/RequestActions";
import { PrimaryButton, Separator } from "../components/CommonUI";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as _ from "lodash";
const moment = require("moment");

// import {Share} from "expo";
// import Share from 'react-native-share';

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
        // data = _.map(data, function(item) {
        //   item.isMenuShown = true;
        //   return item;
        // });
        // console.log(data[0]);
        this.setState(update(this.state, { requests: { $set: data } }));
      }
    } catch (e) {
    } finally {
    }
  };
  render() {
    return (
      <ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={this.state.refresh}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.requests}
          renderItem={({ item, index }) => this.renderRequest(item, index)}
        />
      </ScrollView>
    );
  }
  renderRequest(item, index) {
    if (item.isHidden) {
      return this.renderHiddenRequest.bind(this, item, index)();
    }
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
                fontSize: 16,
                fontWeight: "normal",
                fontFamily: "semiBold",
                width: "70%",
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ width: "15%" }}>
            <TouchableOpacity
              onPress={this.toggleRequestMenu.bind(this, item, index)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <Ionicons
                name={item.isMenuShown ? "ios-arrow-up" : "ios-arrow-down"}
                size={20}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        </View>

        {item.isMenuShown && (
          <View style={{ padding: 16 }}>
            <View
              style={{
                backgroundColor: "#FAFAFA"
              }}
            >
              <TouchableOpacity
                onPress={this.toggleHideRequest.bind(this, item, index)}
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 16,
                    color: "#1976D2"
                  }}
                >
                  Hide Request
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.flagRequest.bind(this, item, index)}
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: 16,
                    color: "#1976D2"
                  }}
                >
                  {!item.isFlagged ? `Flag Request` : `Unflag Request`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 8 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: "15%", height: 35 }}
              source={{
                uri: `https://robohash.org/789/${parseInt(
                  Math.random() * 1000
                )}`
              }}
            />
            <View style={{ width: "85%", paddingLeft: 8 }}>
              <Text style={{ fontFamily: "regular" }}>
                {item.UUser.name
                  ? item.UUser.name
                  : `${item.UUser.firstname} ${item.UUser.lastname}`}
              </Text>
              <Text style={{ fontFamily: "regular", color: "#616161" }}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
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
          onExpectToggle={this.handleToggleExpect.bind(this, item, index)}
          onForward={this.handleForward.bind(this, item)}
          onShare={this.handleShare.bind(this, item)}
          onReply={this.handleReply.bind(this, item)}
        />
        <Separator />
      </View>
    );
  }
  renderHiddenRequest(request, index) {
    return (
      <View>
        <View style={{ padding: 16, flexDirection: "row" }}>
          <View style={{ width: "70%" }}>
            <Text style={{ fontFamily: "regular", fontSize: 16 }}>
              This request is hidden.
            </Text>
          </View>
          <View
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.toggleHideRequest.bind(this, request, index)}
              style={{ width: "100%", alignItems: "flex-end" }}
            >
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 12,
                  color: "#1E88E5"
                }}
              >
                SHOW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
      </View>
    );
  }
  renderObjectives(request) {
    let { _from, _to } = request;
    return (
      <View style={{ padding: 16 }}>
        <View
          style={{ backgroundColor: "#FDD835", borderRadius: 4, padding: 8 }}
        >
          <Text style={{ fontFamily: "regular" }}>
            {`Do you know someone around ${_to.addressLine1}?`}
          </Text>
          <Text
            style={{ color: "#FFFDE7", fontFamily: "semiBold", fontSize: 14 }}
          >
            Forward Post +50 pts.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FF8A65",
            borderRadius: 4,
            padding: 8,
            marginTop: 8
          }}
        >
          <Text style={{ fontFamily: "regular" }}>
            {`Be the first one to reply.`}
          </Text>
          <Text
            style={{ color: "#FFFDE7", fontFamily: "semiBold", fontSize: 14 }}
          >
            Reply Post +50 pts.
          </Text>
        </View>
      </View>
    );
  }
  renderResponses(items) {
    let shape = this.getShape(items.length);
    return (
      <View>
        {shape[0] &&
          this.getResponseList(items.slice(shape[0].initial, shape[0].final))}
        {shape[1] &&
          this.getResponseList(items.slice(shape[1].initial, shape[1].final))}
        {shape[2] &&
          this.getResponseList(items.slice(shape[2].initial, shape[2].final))}
        {shape[3] &&
          this.getResponseList(items.slice(shape[3].initial, shape[3].final))}
        {shape[4] &&
          this.getResponseList(items.slice(shape[4].initial, shape[4].final))}
        {shape[5] &&
          this.getResponseList(items.slice(shape[5].initial, shape[5].final))}
        {shape[6] &&
          this.getResponseList(items.slice(shape[6].initial, shape[6].final))}
        {shape[7] &&
          this.getResponseList(items.slice(shape[7].initial, shape[7].final))}
      </View>
    );
  }
  getResponseList(items) {
    return (
      <FlatList
        style={{marginLeft:16}}
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
      <View style={{ marginBottom: 16, marginRight: 16, width: 150 }}>
        <Image
          style={{ width: "100%", height: 150,borderRadius:2 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
        <View style={{ marginTop: 0}}>
          <Text style={{ fontFamily: "regular", marginTop: 8, fontSize: 14 }}>
            {item.comment || "No comment available"}
          </Text>
          <Text style={{ fontFamily: "regular", color: "#BDBDBD",fontSize: 12 }}>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    );
  }
  getShape = l => {
    let shape = [];
    let rows = Math.min(parseInt(Math.sqrt(l)), 8);
    console.log(rows);
    for (let i = 0; i < rows; i++) {
      shape.push(parseInt(l / rows));
    }
    console.log(shape);
    let remaining = l % rows;
    let index = 0;
    while (index < remaining) {
      shape[index] = shape[index] + 1;
      index++;
    }
    let offset = 0;
    shape = shape.map(elem => {
      let _elem = { size: elem, initial: offset, final: offset + elem };
      offset = offset + elem;
      return _elem;
    });
    console.log(shape);
    return shape;
  };
  handleReply = async request => {
    this.props.navigation.navigate("CameraReply", { request: request });
  };
  handleForward = async request => {
    console.log("Forwarding...");
    this.props.navigation.navigate("ForwardRequest", {
      uRequestId: request.id
    });
  };
  handleShare = async (request, index) => {
    console.log(`sharing req id ${request.id}`);
    try {
      let share = await Share.share(
        {
          message: "test message and url",
          title: "test title"
        },
        { dialogTitle: "android dialog title" }
      );
      console.log(share);
    } catch (err) {
      console.log(err);
    }
  };
  handleToggleExpect = async (request, index) => {
    console.log(`gonna toggle expect for ${request.id}`);
    try {
      let { data, status } = await Api.toggleExpectator(request.id, {
        id: this.state.uUserId,
        points: 50
      });

      if (status == 200) {
        request.isExpecting = data.isExpecting;
        this.setState(
          update(this.state, {
            requests: { index: { $set: request } },
            refresh: { $set: !this.state.refresh }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  toggleRequestMenu = async (request, index) => {
    request.isMenuShown = !request.isMenuShown;
    this.setState(
      update(this.state, {
        requests: { index: { $set: request } },
        refresh: { $set: !this.state.refresh }
      })
    );
  };
  toggleHideRequest = async (request, index) => {
    try {
      let { status, data } = await Api.toggleHideRequest(
        request.id,
        this.state.uUserId
      );

      if (status == 200) {
        request.isHidden = data.isHidden;
        this.setState(
          update(this.state, {
            requests: { index: { $set: request } },
            refresh: { $set: !this.state.refresh }
          })
        );
      }
    } catch (err) {}
  };
  flagRequest = async (request, index) => {
    try {
      let { status, data } = await Api.flagRequest(request.id, {
        id: this.state.uUserId
      });
      if (status == 200) {
        request.isFlagged = data.isFlagged;
        this.setState(
          update(this.state, {
            requests: { index: { $set: request } },
            refresh: { $set: !this.state.refresh }
          })
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
}
