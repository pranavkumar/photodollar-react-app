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

module.exports = ({ children: t }) => {
  let t1 = resolveAssetSource(require("./resources/blackboard1024.png"));
  let t2 = resolveAssetSource(require("./resources/overlayMap.png"));
  let t3 = resolveAssetSource(require("./resources/amaroMap.png"));

  return (
    <Surface style={{ width: "100%", height: "100%" }}>
      <Node
        shader={shaders.Amaro}
        uniforms={{
          inputImageTexture: t,
          inputImageTexture2: t1,
          inputImageTexture3: t2,
          inputImageTexture4: t3
        }}
      />
    </Surface>
  );
};
