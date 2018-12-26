import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import { Ionicons } from "@expo/vector-icons";
import * as Api from "../services/Api";

export default class RequestActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpecting: props.isExpecting };
    // console.log(props);
  }
  componentWillReceiveProps(props) {
    // console.log(props);
    this.setState({ isExpecting: props.isExpecting });
  }
  render() {
    let { isExpecting } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: "25%",
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{ fontFamily: "regular", fontSize: 16, color: "#424242" }}
            >
              Forward
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "25%",
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{ fontFamily: "regular", fontSize: 16, color: "#424242" }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "25%",
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{ fontFamily: "regular", fontSize: 16, color: "#424242" }}
            >
              Expect
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "25%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            padding: 8
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E64A19",
              color: "white",
              borderRadius: 4,
              margin: 4
            }}
          >
            <Text
              style={{ fontFamily: "regular", fontSize: 16, color: "white" }}
            >
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // <PrimaryButton
  //   title="Forward"
  //   onPress={this.props.onForward}
  //   style={{ fontFamily: "regular" }}
  //   containerStyle={{ paddingLeft: 0 }}
  //   type="outline"
  //   buttonStyle={{ fontFamily: "regular" }}
  // />
  // <PrimaryButton
  //   title="Share"
  //   style={{ fontFamily: "regular" }}
  //   containerStyle={{ paddingLeft: 0 }}
  //   type="outline"
  //   buttonStyle={{ fontFamily: "regular" }}
  // />
  // <PrimaryButton
  //   title={isExpecting ? "Unexpect" : "Expect"}
  //   onPress={this.handleToggleExpect.bind(this)}
  //   style={{ fontFamily: "regular" }}
  //   containerStyle={{ paddingLeft: 0 }}
  //   type="outline"
  //   buttonStyle={{ fontFamily: "regular" }}
  // />
  // <PrimaryButton
  //   style={{ fontFamily: "light" }}
  //   onPress={this.props.onReply}
  //   title="Reply"
  //   containerStyle={{ paddingLeft: 0 }}
  //   buttonStyle={{ backgroundColor: "#448AFF", fontFamily: "regular" }}
  // />

  handleToggleExpect = async () => {
    // console.log(`handling expect...${request.id} at index ${index}`);
    try {
      let { data } = await Api.toggleExpectator(this.props.uRequestId, {
        id: this.props.uUserId,
        points: 50
      });

      if (data) {
        this.setState({ isExpecting: data.isExpecting });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
