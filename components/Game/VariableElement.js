import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { pallette, styles } from '../../styles';

export default class VariableElement extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: this.props.e.py,
          left: this.props.e.px,
          width: this.props.e.w,
        }}
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
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: this.props.e.size,
            }}
          >
            {this.props.value}
          </Text>

          {//Display the setup icon if user is admin
            this.props.isAdmin && this.props.varName === 'gameName' ? (
              <TouchableOpacity
                style={{ marginLeft: 10, marginTop: 5 }}
                onPress={this.props.goToSetup}
              >
                <Icon
                  name="wrench"
                  size={20}
                  color={pallette.darkgray}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
        </View>
      </View>
    );
  }
}
