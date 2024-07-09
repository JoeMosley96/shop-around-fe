import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { getCoordinatesFromPostCode, getStores } from "../api";
import CustomButton from "../components/CustomButton";

const MapComponent = ({ postcode, setChosenStore, chosenStore }) => {
  let mapRef = useRef(null);
  const [storesList, setStoresList] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });

  useEffect(() => {
    getCoordinatesFromPostCode(postcode).then((response) => {
      const location = response.data.results[0].geometry.location;
      setLocation(location);
      console.log("Data from google at location    --->", location);
      return location;
    });
  }, [postcode]);

  useEffect(() => {
    console.log(typeof location.lat === "number");
    if (typeof location.lat === "number") {
      getStores(location.lat, location.lng, 500)
        .then((stores) => {
          console.log(stores, "<--stores");
          setError(null);
          setStoresList(stores);
          return stores;
        })
        .then((stores) => {
          const markers = stores.map((shop) => ({
            store_id: shop.store_id,
            locationName: shop.store_name,
            lat: Number(shop.lat),
            lng: Number(shop.lon),
            monday: shop.monday,
            tuesday: shop.tuesday,
            wednesday: shop.wednesday,
            thursday: shop.thursday,
            friday: shop.friday,
            saturday: shop.saturday,
            sunday: shop.sunday,
          }));
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(
              markers.map((marker) => ({
                latitude: marker.lat,
                longitude: marker.lng,
              })),
              {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              }
            );
          }
          setMarkersList(markers);
          return markersList;
        })
        .catch((err) => {
          setError(err);
          console.error("An error occurred:", err);
          console.error(
            "Error details:",
            err.response ? err.response.data : err.message
          );
        });
    }
  }, [location]);

console.log(chosenStore, "<--chosenStore")

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
        {markersList.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.locationName}
          >
            <Callout value={marker.store_id} onPress={()=>setChosenStore(marker.store_id)}>
              <View>
                <Text style={styles.calloutTitle}>{marker.locationName}</Text>
                <Text>{marker.monday}</Text>
                <Text>{marker.tuesday}</Text>
                <Text>{marker.wednesday}</Text>
                <Text>{marker.thursday}</Text>
                <Text>{marker.friday}</Text>
                <Text>{marker.saturday}</Text>
                <Text>{marker.sunday} </Text>
                <Text>{marker.store_id}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center }`}
                >
                  <Text className={`text-primary font-psemibold text-lg`}>
                    {marker.store_id===chosenStore?"Selected":"Select"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
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

export default MapComponent;
