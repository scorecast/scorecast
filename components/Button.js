import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const Button = ({ onPress, style, textStyle, text }) => (
    <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.button, style]}
    >
        <Text style={[{ color: 'white', fontSize: 20 }, textStyle]}>
            {text}
        </Text>
    </TouchableOpacity>
);

export default Button;
