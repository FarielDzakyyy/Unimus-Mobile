import { FONTS } from "@/constants/Font";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Prestasi = () => {
  const router = useRouter();
  return (
    <View className="flex px-5 pt-5">
      <View className="flex-row justify-between items-center mb-4">
        <Text style={styles.menuTitle}>Prestasi Mahasiswa</Text>
        <TouchableOpacity
          onPress={() => router.push("/screens/Prestasi")}
          className="bg-white p-2 px-3 rounded-md shadow-md shadow-black">
          <Text className="text-primary text-bold">Lihat Semua</Text>
        </TouchableOpacity>

        {/* the most recent achievements */}
      </View>
      <View className="bg-white rounded-md p-6 shadow-md shadow-black  elevation-md border border-gray-50 ">
        <View className="flex flex-col gap-2 mb-2">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-sm font-semibold text-dark-100">Universitas Ahmad Dahlan</Text>
            <Text className="text-sm font-semibold text-primary">1</Text>
            <Text className="text-sm font-semibold text-black-100">National</Text>
          </View>
          <Text className="text-sm font-normal text-bgColor-BLUE/70">
            Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For Addressing Global Challenges". Category: Article.
          </Text>
          <View className="w-full h-1 bg-gray-200 mt-2" />
        </View>
        <View className="flex flex-col gap-2 mb-2">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-sm font-semibold text-dark-100">Universitas Diponegoro</Text>
            <Text className="text-sm font-semibold text-primary">Lainnya</Text>
            <Text className="text-sm font-semibold text-black-100">Internasional</Text>
          </View>
          <Text className="text-sm font-normal text-bgColor-BLUE/70">
            Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For Addressing Global Challenges". Category: Article.
          </Text>
          <View className="w-full h-1 bg-gray-200 mt-2" />
        </View>
        <View className="flex flex-col gap-2 mb-2">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-sm font-semibold text-dark-100">Universitas Ahmad Dahlan</Text>
            <Text className="text-sm font-semibold text-primary">1</Text>
            <Text className="text-sm font-semibold text-black-100">National</Text>
          </View>
          <Text className="text-sm font-normal text-bgColor-BLUE/70">
            Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For Addressing Global Challenges". Category: Article.
          </Text>
          <View className="w-full h-1 bg-gray-200 mt-2" />
        </View>
        
      </View>
    </View>
  );
};

export default Prestasi;

const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 16,
    fontFamily: FONTS.PoppinsBold,
    color: "black",
  },
});
