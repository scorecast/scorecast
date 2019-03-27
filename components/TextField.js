import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { pallette } from '../styles';

const style = StyleSheet.create({
    view: {
        height: 56,
        alignSelf: 'stretch',
        backgroundColor: '#ececec',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
        borderColor: '#8e8e8e',
        borderBottomWidth: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    textField: {
        flexGrow: 1,
        height: 56,
        fontSize: 16,
        paddingLeft: 12,
    },
    focused: {
        borderBottomWidth: 2,
        borderColor: pallette.crimson,
        backgroundColor: '#dbdbdb',
    },
});

export default class TextField extends Component {
    state = { focus: false, hidden: this.props.secureTextEntry };

    onFocus = () => {
        this.setState({ focus: true });
        if (this.props.onFocus) this.props.onFocus();
    };

    onBlur = () => {
        this.setState({ focus: false });
        if (this.props.onBlur) this.props.onBlur();
    };

    getStyle = () => {
        return [style.view].concat(this.state.focus ? style.focused : null);
    };

    render() {
        const {
            style: propStyle,
            secureTextEntry,
            onFocus,
            onBlur,
            ...props
        } = this.props;
        return (
            <View style={this.getStyle().concat(propStyle)}>
                <TextInput
                    style={style.textField}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    secureTextEntry={this.state.hidden}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({ hidden: !this.state.hidden })
                        }
                    >
                        <Icon
                            size={20}
                            color="rgba(0, 0, 0, 0.6)"
                            name={this.state.hidden ? 'eye' : 'eye-slash'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
