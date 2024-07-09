import {StyleSheet, Text,ScrollView, View, Button} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";



const Account = () => {
    
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(null);

    useEffect(() => {
      
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://your-backend-api-url/users/1"
          ); 
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }, []);
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {["firstName", "lastName", "email", "password"].map((field) => (
              <View key={field} style={styles.fieldContainer}>
                <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </Text>
                {editing === field ? (
                  <TextInput
                    style={styles.input}
                    value={user[field]}
                    onChangeText={(value) =>
                      setUser({ ...user, [field]: value })
                    }
                  />
                ) : (
                  <Text className="text-2xl text-white text-semibold mt-3 font-psemibold">
                    {user[field]}
                  </Text>
                )}

                <Link
                  className="text-log font-psemibold text-secondary"
                  href="/sign-up"
                  onPress={() => {
                    if (editing === field) {
                      handleChange(field, user[field]);
                    } else {
                      setEditing(field);
                    }
                  }}
                >
                  {" "}
                  {editing === field ? "Save" : "Change"}
                </Link>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

export default Account

const styles = StyleSheet.create({})