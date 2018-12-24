import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import * as Util from "../utils";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
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
      refresh: false
    };
    this.loadFonts = Util.loadFonts.bind(this);
  }

  render() {
    let { fontLoaded } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0 }}>
        <View style={{ height: 60, backgroundColor: "#448AFF", padding: 16 }}>
          <Text style={{ fontFamily: "light", fontSize: 22, color: "white" }}>
            KyaScene
          </Text>
        </View>
        <ScrollView>
          <FlatList
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.coverageRequests}
            renderItem={({ item, index }) => this.renderRequest(item, index)}
          />
        </ScrollView>
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

        <RequestActions
          isExpecting={item.isExpecting}
          onReply={this.handleCreateReply.bind(this, item)}
          onExpect={this.handleToggleExpect.bind(this, item, index)}
        />
      </Card>
    );
  }
  renderResponses(items) {
    return (
      <FlatList
        style={{ backgroundColor: "red" }}
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item }) => this.renderResponse(item)}
      />
    );
  }
  renderResponse(item) {
    return (
      <View style={{ marginBottom: 32 }}>
        <Image
          style={{ width: "100%", height: 100 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
      </View>
    );
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  componentDidMount() {
    Api.getFeed(this.state.UUser.id)
      .then(({ status, data }) => {
        if (status == 200) {
          this.setState(
            update(this.state, { coverageRequests: { $set: data } })
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleCreateReply = async request => {
    console.log(`handling reply...${request.id}`);
    this.props.navigation.navigate("CameraReply", { request: request });
  };
  handleToggleExpect = async (request, index) => {
    console.log(`handling expect...${request.id} at index ${index}`);

    try {
      let { data } = await Api.toggleExpectator(request.id, {
        id: this.state.UUser.id,
        points: "50"
      });

      if (data) {
        request.isExpecting = data.isExpecting;
        this.setState(
          update(this.state, {
            coverageRequests: {
              index: { $set: request }
            },
            refresh: { $set: !this.state.refresh }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
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
