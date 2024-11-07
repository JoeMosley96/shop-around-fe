import { Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../../components/SearchBox";
import MapComponent from "../../components/MapComponent";
import { useLocalSearchParams } from "expo-router";
import { getProducts } from "../../api";
import ProductCard from "../../components/ProductCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProductList(data);
    });
  }, []);

  const filteredResults = productList.filter((product) =>
    product.description.toUpperCase().includes(query.toUpperCase())
  );


  return (
    <SafeAreaView className="bg-primary flex-1">
      <Text className="text-2xl font-psemibold text-white p-4">
        Report the price of an item
      </Text>
      <SearchBox />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.$product_id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <MapComponent />
    </SafeAreaView>
  );
};

export default Search;
