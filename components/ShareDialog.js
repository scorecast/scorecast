import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import { styles, pallette } from '../styles';

const style = StyleSheet.create({
    screen: {
        position: 'absolute',
        backgroundColor: '#00000069',
        zIndex: 1000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        zIndex: 1000,
        backgroundColor: pallette.white,
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderColor: pallette.lightgray,
    },
    dismiss: {
        padding: 20,
        alignItems: 'center',
    },
});

const ShareDialog = ({ tag, gameId, visible, onDismiss }) =>
    visible ? (
        <View style={style.screen} activeOpacity={0}>
            <View style={style.dialog}>
                <View style={style.content}>
                    <Text style={[styles.header, { paddingBottom: 20 }]}>
                        Share
                    </Text>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <QRCode
                            size={200}
                            value={Expo.Linking.makeUrl(`game/${gameId}`)}
                        />
                    </View>
                    {tag ? (
                        <View
                            style={{
                                alignSelf: 'stretch',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 20,
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Tag: {tag}</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.topButton}
                                onPress={() => Share.share({ message: tag })}
                            >
                                <Icon
                                    name="copy"
                                    size={20}
                                    color={pallette.darkgray}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="#000000" />
                    )}
                    <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() =>
                            Share.share({
                                message: `${Expo.Linking.makeUrl(
                                    `game/${gameId}`
                                )}`,
                            })
                        }
                    >
                        <Text style={{ fontSize: 20 }}>Share Game Link</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.dismiss} onPress={onDismiss}>
                    <Text style={{ color: pallette.crimson }}>DISMISS</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : null;

export default ShareDialog;
