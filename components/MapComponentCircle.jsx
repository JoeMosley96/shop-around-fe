import React, { useEffect, useRef } from "react";
import { View, StyleSheet} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
} from "react-native-maps";
import { getCoordinatesFromPostCode} from "../api";

const MapComponentCircle = ({
  postcode,
  setChosenStore,
  chosenStore,
  setChosenStoreName,
  sliderValue,
  location,
  setLocation
}) => {
  let mapRef = useRef(null);

  useEffect(() => {
    const regex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
    if (regex.test(postcode)) {
      getCoordinatesFromPostCode(postcode)
      .then((response) => {
        const location = response.data.results[0].geometry.location;
        setLocation(location);
        return location;
      })

    }
  }, [postcode]);

  useEffect(()=>{
        mapRef.current.fitToCoordinates([
        {
          latitude:location.lat,
          longitude: location.lng
        },
        {
          latitude:location.lat+0.02690000027,
          longitude: location.lng
        },
        {
          latitude:location.lat-0.02690000027,
          longitude: location.lng
        }
      
      ],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          })
      }

,[location])
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: 53.7908895,
          longitude: -1.555376,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {typeof location.lat === "number" ? (
          <>
            <Marker
              key="marker"
              coordinate={{ latitude: location.lat, longitude: location.lng }}
            ></Marker>
            <Circle
              center={{ latitude: location.lat, longitude: location.lng }}
              radius={sliderValue}
            ></Circle>
          </>
        ) : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MapComponentCircle;
