import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import { icons } from "../constants";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import ProductDisplay from "./ProductDisplay"

const SearchBox = ({ setChosenProduct }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      console.log(data, "<-- data within useEffect");
      setProductList(data);
      return data;
    });
  }, []);

  console.log(productList, "<--this is productList");

  const filteredResults = productList.filter(
    (product) =>
      product.description.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.brand.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.product.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.size.toUpperCase().includes(searchTerm.toUpperCase())
  );

  console.log(filteredResults, "<--this is filteredResults");

  return (
    <>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="text-white mt-0.5 text-white flex-1 font-pregular"
          value={searchTerm}
          placeholder="Search for items"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setSearchTerm(e)}
        />
        {/* <TouchableOpacity
          onPress={()=>{
            if(!searchTerm){
              return Alert.alert("Missing search query", "Please Term something to search for items")
            }
            else(setSearchTerm(searchTerm))
          }}
          >
            <Image 
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"/>
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={searchTerm.length ? filteredResults : []}
        keyExtractor={(item) => item.$product_id}
        renderItem={({ item }) => (
          <ProductCard product={item} setChosenProduct={setChosenProduct} setSearchTerm={setSearchTerm}/>
        )}
      />
    </>
  );
};

export default SearchBox;
