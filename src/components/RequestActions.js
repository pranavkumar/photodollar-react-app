import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import * as Api from "../services/Api";

export default class RequestActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpecting: props.isExpecting };
    // console.log(props);
  }
  componentWillReceiveProps = async(props) =>{
    // console.log(props);
    await this.setState({ isExpecting: props.isExpecting });
    // console.log(this.state);

  }
  render() {
    let { isExpecting } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding:8
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
            onPress={this.props.onForward}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons
              name="ios-arrow-round-forward"
              size={32}
              color="#42A5F5"
            />
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
            onPress = {this.props.onShare}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <EvilIcons name="share-google" size={32} color="#42A5F5" />
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
            onPress={this.props.onExpectToggle}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {(!isExpecting)? (<EvilIcons name="arrow-up" size={34} color="#42A5F5" />) : (<EvilIcons name="arrow-down" size={34} color="#757575" />)}

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
          onPress={this.props.onReply}
          style={{
            width: 60,
            height: 25,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#E64A19",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              borderWidth: 0,
              color: "#E64A19",
              fontFamily: "regular"
            }}
          >
            Reply
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }




}
