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

import {
  Amaro,
  Brannan,
  Earlybird,
  F1977,
  Hefe,
  Hudson
} from "../components/filters";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export default class Exp extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      },
      headerStyle: {
        backgroundColor: "transparent"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = { selectedFilterIndex: 0 };
    this.filters = [Amaro, Brannan, Earlybird, F1977, Hefe, Hudson];
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentDidMount = async () => {
    setTimeout(
      function() {
        console.log(typeof this.selectedFilter);
        this.selectedFilter.snap();
      }.bind(this),
      3000
    );
  };
  componentWillMount = async () => {
    await this.loadFonts();
  };
  render() {
    if (!this.state.fontLoaded) return null;
    let { selectedFilterIndex } = this.state;
    let SelectedFilter = this.filters[selectedFilterIndex];

    return (
      <View>
        <View
          style={{
            height: 60,
            backgroundColor: "#EEEEEE",
            padding: 16,
            paddingBottom: 20
          }}
        >
          <Text
            style={{ fontFamily: "regular", fontSize: 18, color: "#757575" }}
          >
            Post Reply
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column"
          }}
        >
          <View style={{ height: "50%" }}>
            <SelectedFilter
              ref={ref => {
                this.selectedFilter = ref;
              }}
              width="100%"
              height={200}
              image={resolveAssetSource(
                require("../components/filters/testimages/running.jpg")
              )}
            />
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
      </View>
    );
  }

  renderFilterPreview(Filter, index) {
    return (
      <View style={{ width: 100 }}>
        <TouchableOpacity onPress={this.applyFilter.bind(this, Filter, index)}>
          <Filter
            width="100%"
            height="75%"
            image={resolveAssetSource(
              require("../components/filters/testimages/running.jpg")
            )}
          />
          <Text style={{ fontFamily: "regular" }}>{Filter.getMeta().name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  applyFilter = async (Filter, index) => {
    console.log(`Applying filter ...${index}`);
    await this.setState({ selectedFilterIndex: index });
  };

  onError() {
    console.log("some error");
  }
}
