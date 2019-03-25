import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link, withRouter } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, pallette } from '../../styles';

const Button = props =>
    props.goBack ? (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.topButton}
            onPress={() => props.history.goBack()}
        >
            <Icon name={props.iconName} size={20} color={pallette.darkgray} />
        </TouchableOpacity>
    ) : (
        <Link
            activeOpacity={0.5}
            style={styles.topButton}
            component={TouchableOpacity}
            to={props.linkTo}
        >
            <Icon name={props.iconName} size={20} color={pallette.darkgray} />
        </Link>
    );

export default withRouter(Button);
