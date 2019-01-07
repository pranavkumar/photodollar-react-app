import { Shaders, Node, GLSL } from "gl-react";
import React from "react";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
  F1977: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .83333)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export default class F1977 extends React.Component {
  constructor(props) {
    super(props);
  }
  static getMeta() {
    return { name: "F1977" };
  }
  snap = async () => {
    if(!this.surface) throw new Error("Surface ref is null");
    console.log(`taking snap...`);
    let capture = await this.surface.glView.capture();
    console.log(capture);
    return capture;
  };
  render() {
    let { width, height, image, style } = this.props;
    return (
      <Surface style={{ width: width, height: height,...style }} ref={ref => {
        this.surface = ref;
      }}>
        <Node
          shader={shaders.F1977}
          uniforms={{
            inputImageTexture: image,
            inputImageTexture2: resolveAssetSource(
              require("./resources/1977map.png")
            )
          }}
        />
      </Surface>
    );
  }
}
