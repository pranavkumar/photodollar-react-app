import { Shaders, Node, GLSL } from "gl-react";
import React from "react";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
  Amaro: {
    frag: GLSL`
      precision highp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

export default class Amaro extends React.Component {
  constructor(props) {
    super(props);
    // this.Surface = Surface;
    this.surface = null;
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  componentDidMount() {}
  static getMeta() {
    return { name: "Amaro" };
  }

  snap = async () => {
    if (!this.surface) throw new Error("Surface ref is null");
    console.log(`taking snap...`);
    let capture = await this.surface.glView.capture();
    console.log(capture);
    return capture;
  };
  onSurfaceLoad() {
    console.log("surface loaded");
  }
  render() {
    let { width, height, image, style } = this.props;
    console.log(style);
    return (
      <Surface
        onLoad={this.onSurfaceLoad}
        style={{ width: width, height: height, ...style }}
        ref={ref => {
          this.surface = ref;
        }}
      >
        <Node
          shader={shaders.Amaro}
          uniforms={{
            inputImageTexture: image,
            inputImageTexture2: resolveAssetSource(
              require("./resources/blackboard1024.png")
            ),
            inputImageTexture3: resolveAssetSource(
              require("./resources/overlayMap.png")
            ),
            inputImageTexture4: resolveAssetSource(
              require("./resources/amaroMap.png")
            )
          }}
        />
      </Surface>
    );
  }
}
