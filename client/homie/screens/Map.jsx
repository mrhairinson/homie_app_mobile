import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
import { useLocation } from "../contexts/UserLocationProvider";

const Map = ({ route }) => {
  // const [curLocation, setCurLocation] = useState(null);
  const { userLocation, setUserLocation } = useLocation();
  // const [errorMsg, setErrorMsg] = useState(null);
  const location = route.params ?? "User location";
  // console.log(location.location);
  return (
    userLocation?.latitude && (
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
            }}
          ></Marker>
        </MapView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
