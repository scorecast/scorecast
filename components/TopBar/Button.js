import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, pallette } from '../../styles';

const Button = props => (
    <Link
        activeOpacity={0.5}
        style={styles.topButton}
        component={TouchableOpacity}
        to={props.linkTo}
    >
        <Icon name={props.iconName} size={20} color={pallette.darkgray} />
    </Link>
);

export default Button;
