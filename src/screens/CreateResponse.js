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

export default class CreateResponse extends React.Component {
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
      height: 500,
      uri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540pranav.fullstack%252Fapp/ImageManipulator/ef232090-1b63-4144-8664-1d0ae52bfa3d.jpg",
      width: 500
    };
    var { height, width } = Dimensions.get("window");
    let image = navigation.getParam("image", _image);
    let thumbnail = navigation.getParam("thumbnail", image);
    let _request = {
      id: "5c1201181781236f919ca833"
    };
    let request = navigation.getParam("request", null);
    if (!request) {
      request = _request;
    }

    this.state = {
      selectedFilterIndex: 0,
      placeholderComment: "Optional comment",
      image: image,
      thumbnail: thumbnail,
      request: request,
      imageWidth: width,
      imageHeight: parseInt((width / image.width) * image.height),
      comment: null
    };

    // console.log(this.state);

    this.filters = [Amaro, Brannan, Earlybird, F1977, Hefe, Hudson];
    this.loadFonts = Utils.loadFonts.bind(this);
  }
  componentDidMount = async () => {};
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
              paddingRight: 0
            }}
          >
            <FlatList
              style={{ margin: 0 }}
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

        <View style={{ alignItems: "center", marginTop: 32 }}>
          <TouchableOpacity
            onPress={this.handlePost.bind(this)}
            style={{
              minWidth: 70,
              height: 35,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#E64A19",
              alignItems: "center",
              justifyContent: "center",
              padding: 8
            }}
          >
            <Text
              style={{
                borderWidth: 0,
                color: "#E64A19",
                fontFamily: "regular"
              }}
            >
              POST REPLY
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }

  renderFilterPreview(Filter, index) {
    let image = this.state.image;
    let _height = parseInt((100 / image.width) * image.height);
    return (
      <View style={{ width: 100, marginRight: 16 }}>
        <TouchableOpacity onPress={this.applyFilter.bind(this, Filter, index)}>
          <Filter
            width={100}
            height={_height}
            image={this.state.thumbnail}
            style={{ borderRadius: 4 }}
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
  handlePost = async () => {
    console.log("gonna post");
    if (this.selectedFilter) {
      console.log("filter available...");
      try {
        let capture = await this.selectedFilter.snap();
        console.log(capture);
        let formData = Utils.formDataFromImage(capture);
        let imageResponse = await Api.postFile("responseImages", formData);
        let {
          result: {
            files: {
              image: [firstImage]
            }
          }
        } = await imageResponse.json();
        console.log(firstImage);

        let { comment, request } = this.state;
        // console.log(this.state);
        let response = {
          comment,
          UUserId: "5c274acc5d90de6eb2981509",
          requestId: request.id,
          image: firstImage
        };
        console.log(response);
        let { status, data } = await Api.postResponse(response);
        console.log(status);
        console.log(data);
        this.props.navigation.navigate("Home");
      } catch (err) {
        throw err;
      }
    } else {
      console.log("no filter...");
    }
  };
}
