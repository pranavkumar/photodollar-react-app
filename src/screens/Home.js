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
import { PrimaryButton, Separator } from "../components/CommonUI";
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
import DefaultFooter from "../components/DefaultFooter";

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
        <View style={{ height: 60, backgroundColor: "#EEEEEE", padding: 16 }}>
          <Text style={{ fontFamily: "light", fontSize: 22, color: "#616161" }}>
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
        <DefaultFooter navigation={this.props.navigation} />
      </View>
    );
  }
  renderRequest(item, index) {
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
                fontSize: 18,
                fontWeight: "normal",
                fontFamily: "regular",
                width: "85%",
                paddingLeft: 8,
                paddingRight: 8
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
        <Separator />
      </View>
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
      <View style={{ marginBottom: 32, marginRight: 16, marginLeft: 16 }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontFamily: "regular", marginTop: 8, fontSize: 16 }}>
            {item.comment || "No comment available"}
          </Text>
          <Text style={{ fontFamily: "regular", color: "#BDBDBD" }}>
            {item.createdAt}
          </Text>
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
