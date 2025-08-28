import { FONTS } from "@/constants/Font";
import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({
  title,
  item,
  color,
  className,
}: {
  title: string;
  item?: string;
  color: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
      <View
        className={cn("flex flex-row items-center justify-start mt-10 p-5", className)}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={color} />
        </TouchableOpacity>
        <View className={cn("flex-1", className)}>
          <Text style={[styles.title, { color }]}>{title}</Text>
        </View>
      </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: FONTS.PoppinsBold,
  },
});
