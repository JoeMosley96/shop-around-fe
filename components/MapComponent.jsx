import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";

const MapComponent = () => {
  const rawData = [
    {
      store_id: 1,
      store_name: "Vue Cinema Leeds - The Light",
      lat: "53.7997617000",
      lon: "-1.5457255000",
      monday: "Monday: 10:00 AM – 3:00 AM",
      tuesday: "Tuesday: 10:00 AM – 3:00 AM",
      wednesday: "Wednesday: 10:00 AM – 3:00 AM",
      thursday: "Thursday: 10:00 AM – 3:00 AM",
      friday: "Friday: 10:00 AM – 3:00 AM",
      saturday: "Saturday: 10:00 AM – 3:00 AM",
      sunday: "Sunday: 10:00 AM – 3:00 AM",
    },
    {
      store_id: 2,
      store_name: "Forbidden Planet International",
      lat: "53.7991821000",
      lon: "-1.5403808000",
      monday: "Monday: 9:30 AM – 6:00 PM",
      tuesday: "Tuesday: 9:30 AM – 6:00 PM",
      wednesday: "Wednesday: 9:30 AM – 6:00 PM",
      thursday: "Thursday: 10:00 AM – 6:00 PM",
      friday: "Friday: 9:30 AM – 6:00 PM",
      saturday: "Saturday: 9:30 AM – 6:30 PM",
      sunday: "Sunday: 11:00 AM – 5:00 PM",
    },
    {
      store_id: 3,
      store_name: "WHSmith",
      lat: "53.7976879000",
      lon: "-1.5439129000",
      monday: "Monday: 9:00 AM – 6:00 PM",
      tuesday: "Tuesday: 9:00 AM – 6:00 PM",
      wednesday: "Wednesday: 9:00 AM – 6:00 PM",
      thursday: "Thursday: 9:00 AM – 6:00 PM",
      friday: "Friday: 9:00 AM – 6:00 PM",
      saturday: "Saturday: 9:00 AM – 6:00 PM",
      sunday: "Sunday: 11:00 AM – 5:00 PM",
    },
    {
      store_id: 4,
      store_name: "Mail Boxes Etc. Leeds",
      lat: "53.8006846000",
      lon: "-1.5506170000",
      monday: "Monday: 9:00 AM – 5:00 PM",
      tuesday: "Tuesday: 9:00 AM – 5:00 PM",
      wednesday: "Wednesday: 9:00 AM – 5:00 PM",
      thursday: "Thursday: 9:00 AM – 5:00 PM",
      friday: "Friday: 9:00 AM – 5:00 PM",
      saturday: "Saturday: Closed",
      sunday: "Sunday: Closed",
    },
    {
      store_id: 5,
      store_name: "TK Maxx",
      lat: "53.7995264000",
      lon: "-1.5431704000",
      monday: "Monday: 9:00 AM – 9:00 PM",
      tuesday: "Tuesday: 9:00 AM – 9:00 PM",
      wednesday: "Wednesday: 9:00 AM – 9:00 PM",
      thursday: "Thursday: 9:00 AM – 9:00 PM",
      friday: "Friday: 9:00 AM – 9:00 PM",
      saturday: "Saturday: 9:00 AM – 9:00 PM",
      sunday: "Sunday: 11:30 AM – 5:30 PM",
    },
  ];

  const markers = rawData.map((shop) => ({
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

  const mapRef = useRef(null);

  useEffect(() => {
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
  }, [markers]);

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
        {markers.map((marker, index) => (
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
