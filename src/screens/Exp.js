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
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";

import { Amaro } from "../components/filters";

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});
class HelloBlue extends React.Component {
  render() {
    const { blue } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
  }
}

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
      0
    );
    return;
  };
  render() {
    let { showFilter } = this.state;
    return (
      <View>
        {showFilter && (
          <Surface style={{ width: "100%", height: 300 }}>
            <Amaro />
          </Surface>
        )}
      </View>
    );
  }
  onError() {
    console.log("some error");
  }
}
