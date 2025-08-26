import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Prestasi = () => {
  const router = useRouter();
  return (
    <View className="flex px-5 pt-5">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-black font-bold text-[18px]">Prestasi Mahasiswa</Text>
        <TouchableOpacity
          onPress={() => router.push("/screens/PrestasiMahasiswa")}
          className=" flex flex-row items-center justify-start gap-2 bg-white p-2 rounded-md shadow-sm shadow-black">
          <Text className="text-primary text-bold mx-2">Lihat Semua</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#3B82F6" />
        </TouchableOpacity>

        {/* the most recent achievements */}
      </View>
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-2 mb-2">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-sm font-semibold text-dark-100">Universitas Ahmad Dahlan</Text>
            <Text className="text-sm font-semibold text-primary">1</Text>
            <Text className="text-sm font-semibold text-black-100">National</Text>
          </View>
          <Text className="text-sm font-normal text-bgColor-BLUE/70">
            Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For Addressing Global Challenges". Category: Article.
          </Text>
          <View className="w-full h-0.5 bg-gray-200 mt-2" />
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
          <View className="w-full h-0.5 bg-gray-200 mt-2" />
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
          {/* <View className="w-full h-1 bg-gray-200 mt-2" /> */}
        </View>
        
      </View>
    </View>
  );
};

export default Prestasi;

