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
import MapComponentResults from "../../components/MapComponentResults";
import ProductDisplay from "../../components/ProductDisplay";
import CustomButton from "../../components/CustomButton";
import {
  getProducts,
  postPrice,
  getStoresById,
  getLocalPrices,
} from "../../api";
import { Link, router } from "expo-router";
import Slider from "@react-native-community/slider";
import { icons } from "../../constants";

const GoShopping = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  const [chosenStore, setChosenStore] = useState("");
  const [chosenStoreName, setChosenStoreName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeInput, setPostcodeInput] = useState("")
  const [priceInput, setPriceInput] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sliderValue, setSliderValue] = useState(500);
  const [location, setLocation] = useState({ lat: "", lng: "" });

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
  };

  const handleDrag = (event) => {
    console.log(event);
    setSliderValue(event);
  };

  const searchForAnother = () => {
    setIsSubmitted(false);
  };

  if (!isSubmitted) {
    return (
      <SafeAreaView className="bg-primary">
        <ScrollView>
          <Text className="text-2xl font-psemibold text-white p-4">
            Find the cheapest price for an item:
          </Text>

          {chosenProduct.product_id ? null : (
            <>
              <Text className="text-l font-psemibold text-white mt-4 mb-2 pl-4">
                Search for items
              </Text>
              <SearchBox setChosenProduct={setChosenProduct} />
            </>
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
            </>
          ) : null}
          <Text className="text-l font-psemibold text-white mt-4 mb-2 pl-4">
            Choose search region:
          </Text>
          {/* <Text className="text-s text-white pl-4 font-pregular">
                Centre:
              </Text> */}
          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4 mb-4 ">
            <TextInput
              className="text-white mt-0.5 text-white flex-1 font-pregular"
              value={postcodeInput}
              placeholder="Enter postcode here"
              placeholderTextColor="#CDCDE0"
              onChangeText={(e) => {
                setPostcodeInput(e)
                if (regex.test(e)) {
                  setPostcode(e);
                }
              }}
            />
          </View>
          <Text className="text-s font-pregular text-white pl-4">
            Radius: {sliderValue} metres
          </Text>
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

          {postcode.length && chosenProduct.product_id ? (
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-secondary rounded-xl min-h-[62px] justify-center items-center m-2"
              onPress={submit}
            >
              <Text className={`text-primary font-psemibold text-lg`}>
                Find Prices
              </Text>
            </TouchableOpacity>
          ) : null}

          <MapComponentCircle
            postcode={postcode}
            setChosenStore={setChosenStore}
            setChosenStoreName={setChosenStoreName}
            chosenStore={chosenStore}
            sliderValue={sliderValue}
            location={location}
            setLocation={setLocation}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center px-4 my-6">
            <Text className="text-2xl text-white text-semibold font-psemibold">
              Reported prices below:
            </Text>
            <Text className="text-l text-white text-semibold mt-3 font-psemibold">
              Green icon{" "}
              <Image
                // styles={{ width: 15, height: 15 }}
                source={icons.greenmarkerresized}
              />{" "}
              indicates cheapest price
            </Text>
            <Text className="text-l text-white text-semibold mt-7 font-psemibold">
              Select the marker to see more details
            </Text>
          </View>
          <MapComponentResults
            location={location}
            setChosenStore={setChosenStore}
            setChosenStoreName={setChosenStoreName}
            chosenStore={chosenStore}
            chosenProduct={chosenProduct}
            sliderValue={sliderValue}
            className="m-4"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-secondary rounded-xl min-h-[62px] justify-center m-4 items-center"
            onPress={searchForAnother}
          >
            <Text className={`text-primary font-psemibold text-lg`}>
              Compare prices for another product
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default GoShopping;
