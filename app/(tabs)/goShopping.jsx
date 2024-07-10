import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import {ScrollView} from "react-native-virtualized-view"
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import MapComponentCircle from "../../components/MapComponentCircle";
import ProductDisplay from "../../components/ProductDisplay";
import CustomButton from "../../components/CustomButton";
import { getProducts, postPrice, getStoresById } from "../../api";
import { Link, router } from "expo-router";
import Slider from "@react-native-community/slider";

const GoShopping = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  const [chosenStore, setChosenStore] = useState("");
  const [chosenStoreName, setChosenStoreName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sliderValue, setSliderValue] = useState(500);

  console.log(chosenProduct, "<--this is chosenProduct");
  console.log(priceInput, "<--this is priceInput");
  console.log(postcode, "<-- this is postcode");
  console.log(chosenStore, "<--this is chosenStore");
  console.log(chosenStoreName, "<-- this is chosenStoreName");

  console.log(
    chosenStore !== 0 && postcode.length && priceInput !== 0,
    "<--ternery logic"
  );

  const regex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  const submit = () => {
    setIsSubmitted(true);
    postPrice({
      price: priceInput,
      store: chosenStore,
      product: chosenProduct.product_id,
    }).then((data) => {
      console.log(data, "<--postedPrice");
    });
  };

  const handleDrag = (event) => {
    console.log(event);
    setSliderValue(event);
  };

  if (!isSubmitted) {
    return (
      <SafeAreaView className="bg-primary">
        <ScrollView>
          <Text className="text-2xl font-psemibold text-white p-4">
            Find the cheapest price for an item:
          </Text>

          {chosenProduct.product_id ? null : (
            <SearchBox setChosenProduct={setChosenProduct} />
          )}

          {chosenProduct.product_id ? (
            <>
              <Text className="text-l font-psemibold text-white p-4">
                Looking for:
              </Text>
              <ProductDisplay
                chosenProduct={chosenProduct}
                setChosenProduct={setChosenProduct}
              />
              <Text className="text-l font-psemibold text-white mt-4 mb-2 pl-4">
                Choose search region:
              </Text>
              <Text className="text-s text-white pl-4 font-pregular">
                Centre:
              </Text>
              <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4 mb-4 ">
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
          <Text className="text-s font-pregular text-white pl-4">Radius:</Text>

          <Slider
            className="w-full h-200 mt-4 mb-4"
            value={sliderValue}
            // style={{ width: 200, height: 40 }}
            minimumValue={100}
            maximumValue={3000}
            step={100}
            onValueChange={(event) => handleDrag(event)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />

          <MapComponentCircle
            postcode={postcode}
            setChosenStore={setChosenStore}
            setChosenStoreName={setChosenStoreName}
            chosenStore={chosenStore}
            sliderValue={sliderValue}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Thank you for submitting
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-secondary rounded-xl min-h-[62px] justify-center items-center"
            onPress={reportAnother}
          >
            <Text className={`text-primary font-psemibold text-lg`}>
              Report another price
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default GoShopping;
