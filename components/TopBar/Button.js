import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link, withRouter } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, pallette } from '../../styles';

const Button = ({ goBack, onPress, history, iconName, linkTo }) =>
    goBack || onPress ? (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.topButton}
            onPress={() => {
                if (onPress) onPress();
                if (goBack) history.goBack();
            }}
        >
            <Icon name={iconName} size={20} color={pallette.darkgray} />
        </TouchableOpacity>
    ) : (
        <Link
            activeOpacity={0.5}
            style={styles.topButton}
            component={TouchableOpacity}
            to={linkTo}
        >
            <Icon name={iconName} size={20} color={pallette.darkgray} />
        </Link>
    );

export default withRouter(Button);
