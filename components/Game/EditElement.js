import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import { Operation } from '../../config/gameAction';
import { createTag } from '../../config/functions';

import { pallette, styles } from '../../styles';

export default class EditElement extends Component {
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
              <TextInput
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: this.props.e.size,
                  backgroundColor: pallette.white,
                  borderRadius: 10
                }}
                onEndEditing={this.props.editCallback}
              >
                {this.props.value}
              </TextInput>
        </View>
      </View>
    );
  }
}
