import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";

const GoShopping = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <Text className="text-2xl font-psemibold text-white p-4">
        Find the cheapest prices in your area
      </Text>
      <SearchBox />
      <MapComponent />
    </SafeAreaView>
  );
};

export default GoShopping;
