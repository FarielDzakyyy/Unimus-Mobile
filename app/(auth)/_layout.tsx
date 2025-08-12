import { images } from "@/constants";
import { FONTS } from "@/constants/Font";
import cn from "clsx";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthLayout() {
   const [activeTab, setActiveTab] = useState<"login" | "signup" | null>(null);
  const router = useRouter();
  const segments = useSegments();

   // Set active tab based on current route
  useEffect(() => {
    const currentSegment = segments[segments.length - 1];
    if (currentSegment === 'sign-in') {
      setActiveTab('login');
    } else if (currentSegment === 'sign-up') {
      setActiveTab('signup');
    }
  }, [segments]);

  const handleTabPress = (tab: "login" | "signup") => {
    setActiveTab(tab);
    if (tab === "login") {
      router.navigate("/sign-in");
    } else {
      router.navigate("/sign-up");
    }
  };

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
        <View
          className={"w-full relative items-center"}
          style={styles.imageContainer}
        >
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
        <View className="flex flex-row justify-center items-center bg-tertiary rounded-xl py-1 px-1 ml-5 mr-5">
          <TouchableOpacity
            className={cn(activeTab === "login" ? "bg-white" : "bg-tertiary", "flex-1 rounded-lg p-5")}
            onPress={() => handleTabPress("login")}
          >
            <Text className={cn(activeTab === "login" ? "text-primary" : "text-black", "text-center font-bold")}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={cn(activeTab === "signup" ? "bg-white" : "bg-tertiary", "flex-1 rounded-lg p-5")}
            onPress={() => handleTabPress("signup")}
          >
            <Text className={cn(activeTab === "signup" ? "text-primary" : "text-black", "text-center font-bold")}>Sign Up</Text>
          </TouchableOpacity>
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
  },
});
