import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverageRequests: []
    };
  }
  render() {
    return (
      <ScrollView style={{ padding: 10 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.coverageRequests}
          renderItem={({ item }) => this.renderRequest(item)}
        />
      </ScrollView>
    );
  }
  renderRequest(item) {
    return (
      <Card containerStyle={{ margin: 0, marginBottom: 10, paddingBottom: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "normal" }}>
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
        >
          <Text
            style={{
              alignItems: "center",
              color: "#BDBDBD",
              marginLeft: 8,
              fontSize: 16
            }}
          >
            #Fashion, #Books
          </Text>
        </View>
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
            onPress={this.handleCreateReply.bind(this)}
            title="Reply"
            containerStyle={{ paddingLeft: 0 }}

          />
        </View>
      </Card>
    );
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
  handleCreateReply(){
    console.log("handling reply...");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
