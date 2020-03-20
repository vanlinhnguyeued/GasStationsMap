import React, { Component } from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { Text, View, Dimensions, Animated } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import APIKEY from '../../data/GGAPIKEY';
import Geocoder from 'react-native-geocoder';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from '../CarouselItem/CarouselItem';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles'
const darkMode = require('../../data/mapStyles.json');
const GGAPIKYE = APIKEY;
const sliderWidth = Dimensions.get("window").width;
const sliderHeight = Dimensions.get("window").height * 0.3;
const itemWidth = Dimensions.get("window").width * 0.9;
export default class MainActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapStyle: darkMode,
            myRegionIcon: require('../../assets/icon/rsz_1mylocation3.png'),
            myRegion: {
                latitude: 16.0645841,
                longitude: 108.1493792,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            objToFind: 'gas_station',
            objsToFind: [],
            radius: 5000,
            streetName: '',
            adminArea: '',
            destination: {},
        }

    }
    setDestination = (obj) => {
        let lat = obj.lat;
        let lng = obj.lng;
        let destination = {
            latitude: lat,
            longitude: lng,
        };
        this.setState({
            destination: destination,
        })

    }
    async getDataFromAPI() {
        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.myRegion.latitude.toString() + ',' + this.state.myRegion.longitude.toString() + '&radius=' + this.state.radius.toString() + '&types=' + this.state.objToFind + '&key=' + GGAPIKYE.toString();
        try {
            let response = await fetch(url)
            let responseJSON = await response.json();
            return responseJSON.results;

        } catch (error) {
            console.log(error);

        }
    }
    addDataToObjsToFind = async () => {
        this.setState({ objsToFind: await this.getDataFromAPI() });
    }
    componentDidMount() {
        Geolocation.getCurrentPosition((position) => {
            this.setState({
                myRegion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                },
            });
            this.addDataToObjsToFind();
            this.getGeocoder();

        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        )

    }
    scrollToIndex = (i) => {
        this.scrollview_ref.snapToItem(i)
    }
    renderObjsMarker() {
        var objsMarker = [];
        var objsToFind = this.state.objsToFind;
        for (let i = 0; i < objsToFind.length; i++) {
            let latitude = objsToFind[i].geometry.location.lat;
            let longitude = objsToFind[i].geometry.location.lng;
            let location = {
                latitude: latitude,
                longitude: longitude,
            }
            objsMarker.push(
                <MapView.Marker
                    onPress={() => {
                        this.scrollToIndex(i);

                    }
                    }
                    key={i.id}
                    coordinate={location}

                />
            )

        }
        return objsMarker;
    }
    getGeocoder = async () => {
        Geocoder.fallbackToGoogle(GGAPIKYE);
        var lat = this.state.myRegion.latitude;
        var lng = this.state.myRegion.longitude;
        let res = await Geocoder.geocodePosition({ lat, lng });
        for (let i of res) {
            this.setState({
                streetName: i.streetName + ' St, ',
                adminArea: i.adminArea,
            });
        }
    }
    render() {
        return (
            <View style={styles.mainView}>
                <MapView
                    ref={ref => this._mapView = ref}
                    style={styles.mapView}
                    initialRegion={this.state.myRegion}
                    showsTraffic={true}
                    customMapStyle={this.state.mapStyle}
                >
                    <MapView.Marker
                        image={this.state.myRegionIcon}
                        coordinate={this.state.myRegion}
                    />
                    {this.renderObjsMarker()}
                    <MapView.Circle
                        center={this.state.myRegion}
                        radius={5000}
                        fillColor="rgba(169,271,255,0.15)"
                    />
                    <MapViewDirections
                        origin={{ latitude: this.state.myRegion.latitude, longitude: this.state.myRegion.longitude }}
                        destination={this.state.destination}
                        apikey={GGAPIKYE}
                        mode='DRIVING'
                        strokeWidth={10}
                        strokeColor='#0080FF'
                    />
                </MapView>
                <View style={styles.addressView}>
                    <Text style={styles.text1}> Your current localion </Text>
                    <Text style={styles.text2}> {this.state.adminArea}</Text>
                    <Text style={styles.text3}> {this.state.streetName} </Text>
                </View>
                <View style={styles.carouselView}>
                    <Carousel
                        ref={ref => { this.scrollview_ref = ref;}}
                        slideStyle={{alignItems: "center"}}
                        sliderHeight={sliderHeight}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        onSnapToItem = {() => {
                            this._mapView.animateToRegion({
                                latitude: this.state.objsToFind[this.scrollview_ref.currentIndex].geometry.location.lat,
                                longitude: this.state.objsToFind[this.scrollview_ref.currentIndex].geometry.location.lng,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }, 1000);
                        }}
                        data={this.state.objsToFind}
                        renderItem={({ item, index }) => {
                            return (
                                <CarouselItem
                                    item={item}
                                    index={index}
                                    curentLocation={this.state.myRegion}
                                    setDestination={(obj) => this.setDestination(obj)}
                                    _map={this._mapView}
                                />
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}