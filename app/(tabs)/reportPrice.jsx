import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";

const ReportPrice = () => {
  return (
    <SafeAreaView className="bg-primary">
      <Text className="text-2xl font-psemibold text-white p-4">
        Report the price of an item
      </Text>
      <SearchInput />
      <MapComponent />
    </SafeAreaView>
  );
};

export default ReportPrice;
