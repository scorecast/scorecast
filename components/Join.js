import {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

import {styles, pallette} from '../styles';

export default class Join extends Component {
    state = {
        codeText: '',
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.content}>
                <Text style={[styles.header, {marginBottom: 50}]}>Join Game</Text>
                <View style={localStyles.codeTextForm}>
                    <TextInput onChangeText={(codeText) => this.setState({codeText})}
                        style={localStyles.codeText}
                        value={this.state.codeText}
                        placeholder="Enter Game ID"
                        placeholderTextColor={pallette.gray}/>
                    <TouchableOpacity style={localStyles.codeTextButton}>
                        <Text style={localStyles.codeTextJoin}>Join!</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.interlude}>- or -</Text>
                <TouchableOpacity style={localStyles.qrButton}>
                    <Icon name="camera" size={20} color="#ffffff00"/>
                    <Text style={localStyles.qrButtonText}>Scan</Text>
                    <Icon name="camera" size={20} color={pallette.white}/>
                </TouchableOpacity>
            </View>);
    }
}

const localStyles = StyleSheet.create({
    codeTextForm: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //backgroundColor: pallette.lightblue,
        //padding: 10,
        height: 35,
        width: 80+'%',
    },
    codeText: {
        minWidth: 200,
        flex:1,
        borderColor: pallette.gray,
        borderWidth: 2,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderRightWidth: 0,
        paddingLeft: 20,
    },
    codeTextButton: {
        flex: 1,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: pallette.green,
    },
    codeTextJoin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: pallette.white,
    },
    qrButton: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 80+'%',
        padding: 18,
        borderRadius: 35,
        backgroundColor: pallette.darkgray,
    },
    qrButtonText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        color: pallette.white,
    }
});
