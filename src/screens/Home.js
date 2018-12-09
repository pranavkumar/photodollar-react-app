import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverageRequests: [
        {
          title: "A giant cat in neighborhood",
          avatarUrl: "https://robohash.org/",
          username: "Aditya"
        },
        {
          title: "How you woke up tonight",
          avatarUrl: "https://robohash.org/",
          username: "Shankar"
        }
      ]
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
          <Avatar
            medium
            rounded
            source={{
              uri: item.avatarUrl + item.username
            }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 16 }}>Bio</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PrimaryButton
            title="Post"
            containerStyle={{ paddingLeft: 0 }}
            type="outline"
          />
        </View>
      </Card>
    );
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
