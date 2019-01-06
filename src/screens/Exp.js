import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput
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
    let navigation = props.navigation;
    let _image = {
      height: 666,
      uri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540pranav.fullstack%252Fapp/ImageManipulator/75e5d6f8-b136-4e98-a370-5ec186e4ddd1.jpg",
      width: 500
    };
    var { height, width } = Dimensions.get("window");


    let image = navigation.getParam("image", _image);

    this.state = {
      selectedFilterIndex: 0,
      placeholderComment: "Optional comment",
      image: image,
      request: navigation.getParam("request", null),
      imageWidth: width,
      imageHeight: parseInt((width / image.width) * image.height)
    };

    console.log(this.state);

    this.filters = [Amaro, Brannan, Earlybird, F1977, Hefe, Hudson];
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentDidMount = async () => {
    setTimeout(
      function() {
        console.log(typeof this.selectedFilter);
        // this.selectedFilter.snap();
      }.bind(this),
      3000
    );
  };
  componentWillMount = async () => {
    await this.loadFonts();
  };
  render() {
    if (!this.state.fontLoaded) return null;
    let { selectedFilterIndex, imageWidth, imageHeight } = this.state;
    let SelectedFilter = this.filters[selectedFilterIndex];

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 70,
            backgroundColor: "#EEEEEE",
            padding: 16,
            paddingBottom: 20
          }}
        >
          <Text
            style={{ fontFamily: "regular", fontSize: 18, color: "#757575" }}
          >
            Create Reply
          </Text>
          <Text
            style={{ fontFamily: "regular", color: "#9E9E9E", marginTop: 4 }}
          >
            To : Shoes you are most fond of
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column"
          }}
        >
          <View>
            <SelectedFilter
              ref={ref => {
                this.selectedFilter = ref;
              }}
              width={imageWidth}
              height={imageHeight}
              image={this.state.image}
            />
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              width: "100%",
              padding: 16,
              paddingRight:0
            }}
          >
            <FlatList
              style={{ margin: 0}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              extraData={this.state.refresh}
              keyExtractor={(item, index) => index.toString()}
              data={this.filters}
              renderItem={({ item, index }) =>
                this.renderFilterPreview.bind(this)(item, index)
              }
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16 }}>
          <TextInput
            style={{
              height: 45,
              borderBottomWidth: 1,
              fontSize: 16,
              borderBottomColor: "#BDBDBD",
              marginBottom: 8,
              fontFamily: "regular"
            }}
            placeholder={this.state.placeholderComment}
            onChangeText={text => this.setState({ comment: text })}
            value={this.state.comment}
          />
        </View>
      </ScrollView>
    );
  }

  renderFilterPreview(Filter, index) {
    let image = this.state.image;
    let _height = parseInt((100 / image.width) * image.height);
    return (
      <View style={{ width: 100, marginRight: 16 }}>
        <TouchableOpacity onPress={this.applyFilter.bind(this, Filter, index)}>
          <Filter width={100} height={_height} image={this.state.image} />
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
