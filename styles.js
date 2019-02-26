import {StyleSheet} from "react-native";

const pallette = {
    white: "#ffffff",
    lightergray: "#f5f5f5",
    lightgray: "#f0f0f0",
    gray: "#b9b9b9",
    darkgray: "#707070",
    black: "#000000",
    crimson: "#ac0000",
    pink: "#ffe6e6",
    lightblue: "#83c2ff",
    green: "#88ff00",
    lightgreen: "#efffe6",
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 0,
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 30
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
        padding: 10
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: pallette.lightgray,
        padding: 20
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    navItemActive: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: pallette.lightergray
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: 'center',
        fontSize: 15
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    logoText: {
        color: pallette.darkgray,
        fontFamily: 'open-sans-semibold',
        fontSize: 24,
        fontWeight: "500"
    }
});

export {
    styles,
    pallette,
}
