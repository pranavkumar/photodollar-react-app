import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  StatusBar,
  Button,
  TouchableOpacity
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { PrimaryButton } from "../components/CommonUI";
import * as Api from "../services/Api";
// import * as Util from "../utils/index.js";
import update from "immutability-helper";
import { Ionicons } from "@expo/vector-icons";
import { ImagePicker, Permissions, Contacts } from "expo";

export default class UserProfile extends React.Component {
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
      UUserId: props.navigation.getParam("uUserId", null),
      UUser: null
    };
    this.loadFonts = Util.loadFonts.bind(this);
    console.log(this.loadFonts);
  }
  componentWillMount = async () => {
    await this.loadFonts();
  };
  render() {
    const { UUser, fontLoaded } = this.state;
    if (!fontLoaded) return null;
    return (
      <View style={{ padding: 0 }}>
        {UUser && (
          <View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#EEEEEE",
                height: "60%",
                padding: 10,
                paddingTop: 24,
                paddingBottom: 0,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: "2%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  marginBottom: 8
                }}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: `${Api.FILE_ENDPOINT}userProfileImages/${
                      UUser.profileImage.name
                    }`
                  }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "semiBold",
                  color: "#616161"
                }}
              >{`${UUser.name}`}</Text>
              <Text style={{ fontFamily: "regular", color: "#616161" }}>{`${
                UUser.points
              } Pts`}</Text>
            </View>

            <View style={{ marginTop: 0, paddingTop: 0 }}>
              <Card
                containerStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
              >
                <View
                  style={{
                    alignItems: "flex-end",
                    paddingBottom: 4,
                    paddingTop: 4
                  }}
                >
                  <View>
                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 25,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#E64A19",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 0,
                          color: "#E64A19",
                          fontFamily: "regular"
                        }}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontFamily: "semiBold" }}>Mobile</Text>
                  <Text style={{ fontFamily: "regular" }}>
                    {UUser.mobile ? `+91 ${UUser.mobile}` : "Unknown"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontFamily: "semiBold" }}>Location</Text>
                  <View style={{ alignItems: "flex-end" }}>
                    {UUser.location ? (
                      <View>
                        <Text style={{ fontFamily: "regular" }}>{`${
                          UUser.location.addressLine1
                        }`}</Text>
                        <Text style={{ fontFamily: "regular" }}>{`${
                          UUser.location.addressLine2
                        }`}</Text>
                        <Text style={{ fontFamily: "regular" }}>{`${
                          UUser.location.country
                        }`}</Text>
                        <Text />
                      </View>
                    ) : (
                      <Text style={{fontFamily:"regular"}}>Unknown</Text>
                    )}
                  </View>
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    );
  }

  componentDidMount = async () => {
    try {
      let res = await Api.getUserProfile(this.state.UUserId);
      if (res.status == 200) {
        let UUser = res.data;
        UUser.profileImage = UUser.profileImage || { name: "default.png" };

        this.setState(update(this.state, { UUser: { $set: res.data } }));
      }
    } catch (err) {
      console.log(err);
    }
  };
}
