import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { pallette } from "../../styles";

export default class LinkElement extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: this.props.e.py,
          left: this.props.e.px,
          width: this.props.e.w,
        }}
        key={this.props.index}
      >
        <TouchableOpacity
          onPress={this.props.onPress}
        >
          <Text
            style={{
              textDecorationLine: 'underline',
              color: pallette.lightblue,
            }}
          >{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
