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
    console.log(props);
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
        <PrimaryButton
          title="Forward"
          style={{ fontFamily: "regular" }}
          containerStyle={{ paddingLeft: 0 }}
          type="outline"
          buttonStyle={{ fontFamily: "regular" }}
        />
        <PrimaryButton
          title={isExpecting ? "Expecting" : "Expect"}
          onPress={this.handleToggleExpect.bind(this)}
          style={{ fontFamily: "regular" }}
          containerStyle={{ paddingLeft: 0 }}
          type="outline"
          buttonStyle={{ fontFamily: "regular" }}
        />
        <PrimaryButton
          style={{ fontFamily: "light" }}
          onPress={this.props.onReply}
          title="Reply"
          containerStyle={{ paddingLeft: 0 }}
          buttonStyle={{ backgroundColor: "#448AFF", fontFamily: "regular" }}
        />
      </View>
    );
  }
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
