import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import Button from './Button';
import { styles, pallette } from '../../styles';

/*const shadowStyle = StyleSheet.create({

});*/

const getButton = b =>
    b ? (
        <Button
            linkTo={b.linkTo}
            iconName={b.iconName}
            goBack={b.goBack}
            onPress={b.onPress}
        />
    ) : (
        <View style={styles.topButton} />
    );

const Bar = ({ left, right, ...props }) => (
    <View style={[
      styles.topbar,
      styles.shadow,
    ]}>
        {getButton(left)}
        <Text style={styles.logoText}>
            {props.logoLeft}
            <Text style={{ color: pallette.crimson }}>{props.logoRight}</Text>
        </Text>
        {getButton(right)}
    </View>
);

export default Bar;
