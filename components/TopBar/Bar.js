import React from 'react';
import { View, Text } from 'react-native';
import TopBarButton from './Button';
import { styles, pallette } from '../../styles';

const noButton = <View style={styles.topButton} />;

const Bar = ({ left, right, leftButton, rightButton, logoLeft, logoRight }) => {
    const getButton = (button, component) => {
        if (button)
            return (
                <TopBarButton
                    linkTo={button.linkTo}
                    iconName={button.iconName}
                />
            );
        else if (component) return component;
        else return noButton;
    };

    return (
        <View style={[styles.topbar]}>
            {getButton(leftButton, left)}
            <Text style={styles.logoText}>
                {logoLeft}
                <Text style={{ color: pallette.crimson }}>{logoRight}</Text>
            </Text>
            {getButton(rightButton, right)}
        </View>
    );
};

export default Bar;
