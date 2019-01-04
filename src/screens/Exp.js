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
import * as Utils from "../services/Utils";

import { Amaro, Brannan } from "../components/filters";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export default class Exp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFilter: false };
    this.filters = [Amaro, Brannan];
    this.loadFonts = Utils.loadFonts.bind(this);
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
  componentWillMount = async () => {
    await this.loadFonts();


  };
  render() {
    if(!this.state.fontLoaded) return null;
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
        <View style={{ height: "70%" }}>
          {showFilter && selectedFilter == 0 && (
            <Amaro
              width="100%"
              height={200}
              image={resolveAssetSource(
                require("../components/filters/testimages/running.jpg")
              )}
            />
          )}
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            height: "30%",
            width: "100%",
            padding: 16
          }}
        >
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            data={this.filters}
            renderItem={({ item, index }) =>
              this.renderFilterPreview(item, index)
            }
          />
        </View>
      </View>
    );
  }

  renderFilterPreview(Filter, index) {
    return (
      <View style={{ width: 100 }}>
        <Filter
          width="100%"
          height="75%"
          image={resolveAssetSource(
            require("../components/filters/testimages/running.jpg")
          )}
        />
        <Text style={{fontFamily:"regular"}}>{Filter.getMeta().name}</Text>
      </View>
    );
  }

  onError() {
    console.log("some error");
  }
}
