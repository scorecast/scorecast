import { Text, TouchableOpacity, View } from "react-native";
import { Operation } from "../../config/gameAction";
import { pallette } from "../../styles";
import React, { Component } from "react";

export default class ButtonElement extends Component {
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
        <View
          style={{
            position: 'absolute',
            left: -(this.props.e.w / 2),
            width: this.props.e.w,
            flexDirection: 'row',
            textAlign: 'center',
          }}
        >
          <TouchableOpacity
            //style={{ marginLeft: 10, marginTop: 5 }}
            style={{
              width: this.props.e.w,
            }}
            onPress={this.props.onPress}
          >
            <Text
              style={[
                {
                  flex: 1,
                  textAlign: 'center',
                  fontSize: this.props.e.size,
                },
                {
                  backgroundColor:
                  pallette.darkgray,
                  color: pallette.white,
                  borderRadius: 10,
                  padding: 10,
                  fontSize: this.props.e.size,
                },
              ]}
            >
              {this.props.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// padding: 5,
// backgroundColor: pallette.green
