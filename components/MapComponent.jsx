import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import {getCoordinatesFromPostCode, getStores} from "../api"

const MapComponent = () => {
  let mapRef = useRef(null);
  const [storesList, setStoresList] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({lat:'',lng:''});
   
  //  setLocation({ lat, lng });
  //  onLocationFetched({ lat, lng });

  useEffect(() => {

    getCoordinatesFromPostCode('le51ta')
      .then((response) => {
        // console.log("--->", response.data.results[0].geometry.location);
      setLocation(response.data.results[0].geometry.location);
      console.log('Data from google at location  --->',location);
      return location;
    })

    getStores()
      .then((stores) => {
        setError(null);
        setStoresList(stores);
        return storesList;
      })
      .then((storesList) => {
        const markers = storesList.map((shop) => ({
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
  }, []);

  return (
    <>
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
              <Callout>
                <View>
                  <Text style={styles.calloutTitle}>{marker.locationName}</Text>
                  <Text>{marker.monday}</Text>
                  <Text>{marker.tuesday}</Text>
                  <Text>{marker.wednesday}</Text>
                  <Text>{marker.thursday}</Text>
                  <Text>{marker.friday}</Text>
                  <Text>{marker.saturday}</Text>
                  <Text>{marker.sunday}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </>
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
