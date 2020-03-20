import { StyleSheet, Dimensions } from "react-native";

var styles = StyleSheet.create({
    mainView: { flex: 1, position: 'relative' },
    mapView: { flex: 1, position: 'absolute', width: "100%", height: '100%', top: 0, left: 0, },
    addressView: {
        paddingLeft: 20,
        flexDirection: "column",
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '14%',
        top: '55%',
        left: 0,
    },
    text1: { fontSize: 18, fontWeight: '700', color: 'white' },
    text2: { fontSize: 30, fontWeight: '900', color: 'white' },
    text3: { fontSize: 25, fontWeight: '900', color: 'white' },
    carouselView: {
        flexDirection: "column",
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '30%',
        top: '70%',
        left: 0,
        paddingBottom: 10,
    }

})
export default styles;