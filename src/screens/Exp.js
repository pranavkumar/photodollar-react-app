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

import { Amaro } from "../components/filters";
import GLImage from "gl-react-image";



export default class Exp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFilter: false };
  }
  componentDidMount = async () => {
    setTimeout(
      function() {
        this.setState({ showFilter: true });
      }.bind(this),
      1000
    );
    return;
  };
  render() {
    let { showFilter } = this.state;
    return (
      <View>
        {showFilter && (
            <Amaro>
              {{uri:"https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/bozwnlrrb9sevx4ygiel/flex-2018-rn-mens-running-shoe-zREVkk.jpg"}}
            </Amaro>
        )}
      </View>
    );
  }
  onError() {
    console.log("some error");
  }
}
