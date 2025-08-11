import { images } from "@/constants";
import { FONTS } from "@/constants/Font";
import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        className={"bg-bgColor h-full"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className={"w-full relative items-center"} style={styles.imageContainer}>
          <ImageBackground
            source={images.loginGraphic}
            className={"size-full rounded-b-lg "}
            resizeMode="contain"
          >
            {/* Logos */}
            <View className="justify-center items-center space-x-4 mt-10 mb-5">
              <Image
                source={images.logo}
                className={"self-center absolute top-10 left-5 size-21"}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>

          {/* Title */}
          <Text
            style={styles.title}
            className={"self-center absolute top-40 left-5"}
          >
            Sistem Informasi Akademik UNIMUS
          </Text>
        </View>
        <Slot />
      </ScrollView>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get("screen").height / 2.53,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.PoppinsBold,
    color: "#ffff",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 5,
    marginTop: 20,
  }
});
