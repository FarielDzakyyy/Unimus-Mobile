import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "./Header";

const Prestasi = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title="Prestasi Mahasiswa" color="white" />

        {/* Ujian List */}
        <View className="flex mt-5 bg-white rounded-t-3xl min-h-full">
          <Text className="text-black font-bold text-[18px] mt-5 mb-5 mx-4">
            Prestasi Anda
          </Text>
          <View className="flex px-5 pt-2">
            <View className="flex flex-col gap-2 mb-2">
              <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-secondary">
                  Universitas Ahmad Dahlan
                </Text>
                <Text className="text-sm font-semibold text-primary">1</Text>
                <Text className="text-sm font-semibold text-secondary">
                  National
                </Text>
              </View>
              <Text className="text-sm font-normal text-bgColor-BLUE/70">
                Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For
                Addressing Global Challenges". Category: Article.
              </Text>
              <View className="w-full h-1 bg-gray-200 mt-2" />
            </View>
            <View className="flex flex-col gap-2 mb-2">
              <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-secondary">
                  Universitas Diponegoro
                </Text>
                <Text className="text-sm font-semibold text-primary">
                  Lainnya
                </Text>
                <Text className="text-sm font-semibold text-secondary">
                  Internasional
                </Text>
              </View>
              <Text className="text-sm font-normal text-bgColor-BLUE/70">
                Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For
                Addressing Global Challenges". Category: Article.
              </Text>
              <View className="w-full h-1 bg-gray-200 mt-2" />
            </View>
            <View className="flex flex-col gap-2 mb-2">
              <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-secondary">
                  Universitas Ahmad Dahlan
                </Text>
                <Text className="text-sm font-semibold text-primary">1</Text>
                <Text className="text-sm font-semibold text-secondary">
                  National
                </Text>
              </View>
              <Text className="text-sm font-normal text-bgColor-BLUE/70">
                Ahmad Dahlan International Youth Camp 2024 "Exploring Skills For
                Addressing Global Challenges". Category: Article.
              </Text>
              <View className="w-full h-1 bg-gray-200 mt-2" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Prestasi;
