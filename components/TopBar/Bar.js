import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { styles, pallette } from '../../styles';

const getButton = b =>
    b ? (
        <Button linkTo={b.linkTo} iconName={b.iconName} goBack={b.goBack} />
    ) : (
        <View style={styles.topButton} />
    );

const Bar = ({ left, right, ...props }) => (
    <View style={[styles.topbar]}>
        {getButton(left)}
        <Text style={styles.logoText}>
            {props.logoLeft}
            <Text style={{ color: pallette.crimson }}>{props.logoRight}</Text>
        </Text>
        {getButton(right)}
    </View>
);

export default Bar;
