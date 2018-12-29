import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modal";
import * as _ from "lodash";
import * as Props from "../props";

class Separator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = _.merge({}, Props.SeparatorProps, this.props.style);
    return <View style={props} />;
  }
}

class MoneyView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={{ color: "#66BB6A", fontSize: 16 }}>
          {"$" + this.props.value}
        </Text>
      </View>
    );
  }
}

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  componentWillReceiveProps(props) {
    // console.log(props);
    this.setState({ isChecked: props.isChecked });
  }
  render() {
    let { isChecked } = this.state;
    return (
      <View
        style={{
          width: 16,
          height: 16,
          borderWidth: 1,
          borderColor: "#448AFF",
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor: isChecked ? "#448AFF" : "white",
            borderRadius: 2
          }}
        />
      </View>
    );
  }
}

class BinaryChoiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
      text: this.props.text || "Default Text"
    };
  }
  render() {
    return (
      <Modal isVisible={this.state.isVisible}>
        <View style={Props.BinaryChoiceModalProps}>
          {!this.props.component && (
            <Text style={{ marginBottom: 14, fontSize: 18 }}>
              {this.state.text}
            </Text>
          )}
          {this.props.component != undefined && this.props.component}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <PrimaryButton title="Cancel" onPress={this.onCancel.bind(this)} />
            <PrimaryButton title="Ok" onPress={this.onOk.bind(this)} />
          </View>
        </View>
      </Modal>
    );
  }
  onOk() {
    this.props.onOk();
  }
  onCancel() {
    this.props.onCancel();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }
}

class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = null;
    switch (this.props.type) {
      case "outline":
        props = _.merge({}, Props.PrimaryButtonOutlineProps, this.props);
        break;
      default:
        props = _.merge({}, Props.PrimaryButtonProps, this.props);
    }
    return (
      <Button
        containerStyle={props.containerStyle}
        style={props.buttonStyle}
        styleDisabled={{ color: "red" }}
        onPress={props.onPress}
      >
        {props.title}
      </Button>
    );
  }
}

class InputMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacityValue: new Animated.Value(1),
      translateYValue: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: 700
      }),
      Animated.timing(this.state.translateYValue, {
        toValue: -30,
        duration: 700
      })
    ]).start();
  }
  render() {
    return (
      <Animated.View
        style={{
          translateY: this.state.translateYValue,
          opacity: this.state.opacityValue
        }}
      >
        <TextInput
          keyboardType="numeric"
          placeholder="Mobile no"
          style={{
            width: "100%",
            height: 40,
            fontSize: 16,
            fontFamily: "light",
            color: "#1E88E5"
          }}
          placeholderTextColor="#1E88E5"
        />
      </Animated.View>
    );
  }
}


module.exports = {
  Separator,
  PrimaryButton,
  MoneyView,
  BinaryChoiceModal,
  CheckBox,
  InputMobile
};
