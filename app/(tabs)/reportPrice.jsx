import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";
import ProductDisplay from "../../components/ProductDisplay";
import CustomButton from "../../components/CustomButton";
import { getProducts } from "../../api";

const ReportPrice = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  const [chosenStore, setChosenStore] = useState("");
  const [postcode, setPostcode] = useState("");
  const [priceInput, setPriceInput] = useState(0);

  console.log(chosenProduct, "<--this is chosenProduct");
  console.log(priceInput, "<--this is priceInput");
  console.log(postcode, "<-- this is postcode");

  const regex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  return (
    <SafeAreaView className="bg-primary">
      <Text className="text-2xl font-psemibold text-white p-4">
        Report the price of an item
      </Text>

      {chosenProduct.product_id ? null : (
        <SearchBox setChosenProduct={setChosenProduct} />
      )}

      {chosenProduct.product_id ? (
        <>
          <Text className="text-l font-psemibold text-white p-4">
            Reporting the price of:
          </Text>
          <ProductDisplay
            chosenProduct={chosenProduct}
            setChosenProduct={setChosenProduct}
          />
          {/* <Text className="text-l font-psemibold text-white p-4">Reporting the price of:</Text> */}
          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput
              className="text-white mt-0.5 text-white flex-1 font-pregular"
              value={priceInput}
              placeholder="Enter price here in £"
              placeholderTextColor="#CDCDE0"
              keyboardType="numeric"
              onChangeText={(e) => setPriceInput(Number(e))}
            />
          </View>
          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput
              className="text-white mt-0.5 text-white flex-1 font-pregular"
              value={priceInput}
              placeholder="Enter postcode here"
              placeholderTextColor="#CDCDE0"
              onChangeText={(e) => {
                if (regex.test(e)) {
                  setPostcode(e);
                }
              }}
            />
          </View>
        </>
      ) : null}

      <MapComponent
        postcode={postcode}
        setChosenStore={setChosenStore}
        chosenStore={chosenStore}
      />

      {chosenStore.length && postcode.length && priceInput !== 0 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center }`}
        >
          <Text className={`text-primary font-psemibold text-lg`}>
           Submit
          </Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default ReportPrice;
