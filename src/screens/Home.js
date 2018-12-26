import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import * as Util from "../utils";
import * as Utils from "../services/Utils";

import update from "immutability-helper";
import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  EvilIcons,
  AntDesign
} from "@expo/vector-icons";
import { ImagePicker, Permissions, Contacts } from "expo";
import RequestActions from "../components/RequestActions";

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: ({ state }) => {
        return null;
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      coverageRequests: [],
      UUser: {
        id: "5c11ff3f19d3da6e905ec39c"
      },
      uUserId: "5c11ff3f19d3da6e905ec39c",
      refresh: false
    };
    this.loadFonts = Util.loadFonts.bind(this);
  }

  render() {
    let { fontLoaded } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0, flexDirection: "column", flex: 1 }}>
        <View style={{ height: 60, backgroundColor: "#448AFF", padding: 16 }}>
          <Text style={{ fontFamily: "light", fontSize: 22, color: "white" }}>
            KyaScene
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={this.state.refresh}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.coverageRequests}
          renderItem={({ item, index }) => this.renderRequest(item, index)}
        />
        <View
          style={{
            alignSelf: "flex-end",
            height: 50,
            width: "100%",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "33%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.gotoProfile.bind(this)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SimpleLineIcons name="user" size={28} color="#448AFF" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "33%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.gotoRequest.bind(this)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SimpleLineIcons name="plus" size={32} color="#448AFF" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "33%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.gotoSearch.bind(this)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <AntDesign name="search1" size={32} color="#448AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  renderRequest(item, index) {
    return (
      <Card containerStyle={{ margin: 0, marginBottom: 10, paddingBottom: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ flexDirection: "column", marginLeft: 8, marginBottom: 8 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                fontFamily: "regular"
              }}
            >
              {item.title}
            </Text>
          </View>
        </View>

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
      </Card>
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
      <View style={{ marginBottom: 32, marginRight: 32 }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
        <Text style={{ fontFamily: "regular", marginTop: 8 }}>
          {item.comment || "No comment available"}
        </Text>
        <Text style={{ fontFamily: "regular" }}>{item.createdAt}</Text>
      </View>
    );
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount = async () => {
    try {
      let { status, data } = await Api.getFeed(this.state.UUser.id);
      if (status == 200) {
        this.setState(update(this.state, { coverageRequests: { $set: data } }));
      }
      if (this.state.uUserId) {
        console.log("loading user...");
        let { status, data } = await Api.getUserProfile(this.state.uUserId);
        console.log(data);
        let uUser = data;
        await Utils.syncContacts(uUser.id, uUser.lastContactSync);
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleReply = async request => {
    this.props.navigation.navigate("CameraReply", { request: request });
  };
  handleForward = async request => {
    this.props.navigation.navigate("ForwardRequest", {
      URequestId: request.id
    });
  };
  gotoProfile() {
    this.props.navigation.navigate("UserProfile");
  }
  gotoRequest() {
    this.props.navigation.navigate("CreateRequest");
  }
  gotoSearch() {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
