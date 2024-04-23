import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import Mapbox from "@rnmapbox/maps";
// import * as Location from "expo-location";
import { useLocation } from "../contexts/UserLocationProvider";
import { MAP_BOX_PUBLIC_KEY } from "@env";
import COLOR from "../constants/color";

Mapbox.setAccessToken(MAP_BOX_PUBLIC_KEY);

const Map = ({ route }) => {
  const { userLocation, setUserLocation } = useLocation();
  useEffect(() => {
    console.log("Map");
  }, []);
  // const [curLocation, setCurLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  const location = route.params ?? "User location";
  // console.log(location.location);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Images>
            <Mapbox.Image name="topImage">
              <View
                style={{
                  borderColor: COLOR.PRIMARY,
                  borderWidth: 2,
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: COLOR.LIGHT_GRAY,
                }}
              />
            </Mapbox.Image>
          </Mapbox.Images>
          <Mapbox.Camera
            defaultSettings={{
              zoomLevel: 14,
              centerCoordinate: [userLocation.longitude, userLocation.latitude],
            }}
          />
          <Mapbox.LocationPuck
            topImage="topImage"
            visible={true}
            scale={["interpolate", ["linear"], ["zoom"], 10, 1.0, 20, 4.0]}
            pulsing={{
              isEnabled: true,
              color: "teal",
              radius: 50.0,
            }}
          />
        </Mapbox.MapView>
      </View>
    </View>
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
