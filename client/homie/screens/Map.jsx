import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import Mapbox from "@rnmapbox/maps";
// import * as Location from "expo-location";
import { useLocation } from "../contexts/UserLocationProvider";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiaGFpMTIxMjIwMDEiLCJhIjoiY2x1ZTFyMGZtMTU4dTJqa2kybzc2NzQ4cyJ9.0orgMwvt58BgDPgayn-eFA"
);

const Map = ({ route }) => {
  // const [curLocation, setCurLocation] = useState(null);
  const { userLocation, setUserLocation } = useLocation();
  // const [errorMsg, setErrorMsg] = useState(null);
  const location = route.params ?? "User location";
  // console.log(location.location);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
    // userLocation?.latitude && (
    //   <View>
    //     <MapView
    //       style={styles.map}
    //       region={{
    //         latitude: userLocation?.latitude,
    //         longitude: userLocation?.longitude,
    //         latitudeDelta: 0.0421,
    //         longitudeDelta: 0.0421,
    //       }}
    //     >
    //       <Marker
    //         coordinate={{
    //           latitude: userLocation?.latitude,
    //           longitude: userLocation?.longitude,
    //         }}
    //       ></Marker>
    //     </MapView>
    //   </View>
    // )
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
export default Map;
