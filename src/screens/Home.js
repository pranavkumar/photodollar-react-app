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
      coverageRequests: []
    };
    this.loadFonts = Util.loadFonts.bind(this);
  }

  render() {
    let {fontLoaded} = this.state;
    if(!fontLoaded) return null;
    return (
      <View style={{ padding: 0 }}>
        <View style={{height:60,backgroundColor:"#448AFF",padding:10}}>
          <Text style={{fontFamily:"light",fontSize:22,color:"white"}}>KyaScene</Text>
        </View>
        <ScrollView>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.coverageRequests}
            renderItem={({ item }) => this.renderRequest(item)}
          />
        </ScrollView>
      </View>
    );
  }
  renderRequest(item) {
    return (
      <Card containerStyle={{ margin: 0, marginBottom: 10, paddingBottom: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ flexDirection: "column", marginLeft: 8, marginBottom: 8 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "normal", fontFamily:"regular" }}>
              {item.title}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        />
        {item.UResponses &&
          item.UResponses.length > 0 &&
          this.renderResponses(item.UResponses)}
        <View />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <PrimaryButton
            title="Forward"
            containerStyle={{ paddingLeft: 0 }}
            type="outline"
          />
          <PrimaryButton
            title="Expect"
            containerStyle={{ paddingLeft: 0 }}
            type="outline"
          />
          <PrimaryButton
            onPress={this.handleCreateReply.bind(this, item)}
            title="Reply"
            containerStyle={{ paddingLeft: 0 }}
            buttonStyle={{ backgroundColor: "#42A5F5" }}
          />
        </View>
      </Card>
    );
  }
  renderResponses(items) {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item }) => this.renderResponse(item)}
      />
    );
  }
  renderResponse(item) {
    return (
      <View style={{ marginBottom: 16 }}>
        <Image
          style={{ width: "100%", height: 100 }}
          source={{
            uri: Api.FILE_ENDPOINT + "responseImages/" + item.image.name
          }}
        />
      </View>
    );
  }
  componentWillMount = async()=>{
    console.log("gonna mount");
    await this.loadFonts();
  }
  componentDidMount() {
    Api.getRequests()
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
