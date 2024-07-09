import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox"
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";
import ProductDisplay from "../../components/ProductDisplay"
import {getProducts} from "../../api"

const ReportPrice = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  console.log(chosenProduct, "<--this is chosenProduct")


  return (
    <SafeAreaView className="bg-primary">
      <Text className="text-2xl font-psemibold text-white p-4">
        Report the price of an item
      </Text>
      {chosenProduct.product_id?
      null:
      <SearchBox setChosenProduct={setChosenProduct}/>}
      

      {chosenProduct.product_id?
      <>
      <Text className="text-l font-psemibold text-white p-4">Reporting the price of</Text>
      <ProductDisplay chosenProduct={chosenProduct} setChosenProduct={setChosenProduct}/>
      </>
      :null}
      <MapComponent />
    </SafeAreaView>
  );
};

export default ReportPrice;
