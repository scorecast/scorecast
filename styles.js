import { Platform, StyleSheet } from "react-native";

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
    darkgreen: '#4e8c07',
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
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
    },
    topButton: {
        padding: 20,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 24,
        fontWeight: '700',
    },
    listView: {
        backgroundColor: pallette.white,
    },
    listViewRow: {
        padding: 20,
        fontSize: 20,
    },
    listViewRowText: {
        fontSize: 20,
    },
    button: {
        backgroundColor: pallette.crimson,
        color: 'white',
        padding: 16,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    shadow: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0,
        }
      },
      android: {
        elevation: 1,
      },
    }),
    },
});

export { styles, pallette };
