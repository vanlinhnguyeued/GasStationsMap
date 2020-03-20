import { StyleSheet, Dimensions } from "react-native";

var styles = StyleSheet.create({
    carouselItemView: {
        flexDirection: 'column',
        width: "90%",
        height: "100%",
        backgroundColor: 'white',
        borderRadius: 10,
    },
    view1: {
        width: "100%",
        height: '50%',
        flexDirection: 'column',
        padding: 10,
    },
    view1a: {
        flexDirection: 'row',
        width: '100%',
        height: '50%'
    },
    iconGasStation: {
        width: '18%',
        height: '100%'
    },
    textNameStation: {
        width: '80%',
        height: "100%",
        textAlign: 'left',
        color: "#0B173B",
        paddingLeft: 10,
        fontWeight: '700',
        fontSize: 15,
    },
    textAddress: {
        width: '100%',
        height: '50%',
        textAlign: 'left',
        color: "#A4A4A4",
        paddingTop: 10,
        fontWeight: '700',
        fontSize: 15,
    },
    view2: {
        width: "100%",
        height: '50%',
        flexDirection: 'column',
        backgroundColor: "#F2F2F2",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    view2a: {
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD'
    },
    view2b: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#BDBDBD'
    },
    textEstimateData: {
        width: '100%',
        height: '50%',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700'
    },
    textEstimate: {
        width: '100%',
        height: '50%',
        textAlign: 'center',
        fontSize: 15,
        color: '#BDBDBD'
    },
    btnComeHere: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    textInBtn: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700',
        marginRight: 20
    },
    iconInBtn:{ alignSelf: 'center' }

})
export default styles;