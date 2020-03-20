import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import getDistance from 'geolib/es/getDistance';
import styles from './styles'

const paddingBottom = Dimensions.get("window").height * 0.85;
export default class CarouselItem extends Component {
    _getDistance = () => {
        var dis = getDistance(
            { latitude: this.props.curentLocation.latitude, longitude: this.props.curentLocation.longitude },
            { latitude: this.props.item.geometry.location.lat, longitude: this.props.item.geometry.location.lng }
        );
        return Math.round(dis / 1000 * 100) / 100;
    };
    render() {
        return (
            <View key={this.props.index} style={styles.carouselItemView}>
                <View style={styles.view1} >
                    <View style={styles.view1a} >
                        <Image source={{ uri: this.props.item.icon }} style={styles.iconGasStation} />
                        <Text style={styles.textNameStation} > {this.props.item.name} </Text>
                    </View>
                    <Text style={styles.textAddress}> {this.props.item.vicinity} </Text>
                </View>
                <View style={styles.view2} >
                    <View style={styles.view2a}>
                        <View style={styles.view2b}>
                            <Text style={styles.textEstimateData}> {this._getDistance()} Km </Text>
                            <Text style={styles.textEstimate}> Distance </Text>
                        </View>
                        <View style={styles.view2b}>
                            <Text style={styles.textEstimateData}> {Math.round(this._getDistance() / 40 * 60)} minutes </Text>
                            <Text style={styles.textEstimate}>Estimated</Text>
                        </View>
                    </View>
                    <View style={styles.view2a}>
                        <TouchableOpacity
                            style={styles.btnComeHere}
                            onPress={() => {
                                this.props.setDestination(this.props.item.geometry.location)
                                this.props._map.animateToRegion(
                                    {
                                        latitude: (this.props.curentLocation.latitude + this.props.item.geometry.location.lat) / 2,
                                        longitude: (this.props.curentLocation.longitude + this.props.item.geometry.location.lng) / 2,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }
                                    , 1000
                                );
                                this.props._map.fitToCoordinates(
                                    [{
                                        latitude: this.props.curentLocation.latitude,
                                        longitude: this.props.curentLocation.longitude,

                                    },
                                    {
                                        latitude: this.props.item.geometry.location.lat,
                                        longitude: this.props.item.geometry.location.lng,

                                    },
                                    ],
                                    {
                                        edgePadding: { top: 10, right: 10, bottom: paddingBottom, left: 10 },
                                        animated: true,
                                    },
                                )
                            }}
                        >
                            <Text style={styles.textInBtn} > Come here  </Text>
                            <Image style={styles.iconInBtn} source={require('../../assets/icon/rightturn.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}