import { StyleSheet } from 'react-native';

const pallette = {
    white: '#ffffff',
    lightergray: '#f5f5f5',
    lightgray: '#f0f0f0',
    gray: '#b9b9b9',
    darkgray: '#707070',
    black: '#000000',
    crimson: '#ac0000',
    pink: '#ffe6e6',
    lightblue: '#83c2ff',
    green: '#88ff00',
    lightgreen: '#efffe6',
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        backgroundColor: pallette.lightgray,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.white,
    },
    header: {
        fontSize: 30,
    },
    interlude: {
        paddingTop: 30,
        fontSize: 24,
        paddingBottom: 30,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: pallette.lightgray,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
        padding: 20,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    navItemActive: {
        backgroundColor: pallette.lightergray,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    logoText: {
        color: pallette.darkgray,
        fontFamily: 'open-sans-semibold',
        fontSize: 24,
        fontWeight: '500',
    },
    listView: {
        //flex: 1,
        width: 80 + '%',
    },
    listViewRow: {
        padding: 10,
    },
    listViewRowText: {
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
    },
});

export { styles, pallette };
