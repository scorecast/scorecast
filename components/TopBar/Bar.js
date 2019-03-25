import React from 'react';
import { View, Text } from 'react-native';
import TopBarButton from './Button';
import { styles, pallette } from '../../styles';

const noButton = <View style={styles.topButton} />;

const Bar = ({ left, right, ...props }) => (
    <View style={[styles.topbar]}>
        {left ? (
            <TopBarButton linkTo={left.linkTo} iconName={left.iconName} />
        ) : (
            noButton
        )}
        <Text style={styles.logoText}>
            {props.logoLeft}
            <Text style={{ color: pallette.crimson }}>{props.logoRight}</Text>
        </Text>
        {right ? (
            <TopBarButton linkTo={right.linkTo} iconName={right.iconName} />
        ) : (
            noButton
        )}
    </View>
);

export default Bar;
