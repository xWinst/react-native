import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: route.params.coords.latitude,
                    longitude: route.params.coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: route.params.coords.latitude,
                        longitude: route.params.coords.longitude,
                    }}
                />
            </MapView>
        </View>
    );
};

export default MapScreen;
