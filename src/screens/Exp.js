import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  WebView
} from "react-native";
import * as Api from "../services/Api";
import update from "immutability-helper";

import { Amaro, Brannan } from "../components/filters";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export default class Exp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFilter: false };
    this.filters = [Amaro, Brannan];
  }
  componentDidMount = async () => {
    setTimeout(
      function() {
        this.setState({ showFilter: true });
      }.bind(this),
      0
    );
    return;
  };
  render() {
    let { showFilter } = this.state;
    let selectedFilter = 0;
    return (
      <View
        style={{
          flex: 1,
          height: "100%",

          width: "100%",
          flexDirection: "column"
        }}
      >
        <View style={{ height: "80%" }}>
          {showFilter && selectedFilter == 0 && (
            <Amaro>
              {resolveAssetSource(
                require("../components/filters/testimages/running.jpg")
              )}
            </Amaro>
          )}
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            height: "20%",
            width: "100%",
            padding: 16
          }}
        >
          <Text>Holla</Text>
        </View>
      </View>
    );
  }
  onError() {
    console.log("some error");
  }
}

// {showFilter && selectedFilter == 0 && (
//   <Amaro>
//     {resolveAssetSource(
//       require("../components/filters/testimages/running.jpg")
//     )}
//   </Amaro>
// )}
// {showFilter && selectedFilter == 1 && (
//   <Brannan>
//     {resolveAssetSource(
//       require("../components/filters/testimages/running.jpg")
//     )}
//   </Brannan>
// )}
