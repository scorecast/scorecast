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
          // padding: 5,
          // backgroundColor: pallette.green
        }}
        key={this.props.index}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: -(this.props.e.w / 2),
            width: this.props.e.w,
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            // padding: 5,
            // backgroundColor: pallette.pink
          }}
            onPress={this.props.onPress}
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                color: pallette.lightblue,
                flex: 1,
                textAlign: 'center',
                fontSize: this.props.e.size,
              }}
            >{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
