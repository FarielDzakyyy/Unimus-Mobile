import { images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const ProfileCard = () => {
  return (
    <View className="relative px-4 z-10 -mt-4">
      <View className="items-center ">
        <View className="relative z-10 w-22 h-22 rounded-full bg-white items-center justify-center p-1 shadow-xl shadow-black">
          <Image
            source={images.personCircleOutline}
            style={{ height: 70, width: 70 }}
            className="rounded-full "
          />
        </View>
        <View
          className="bg-white rounded-2xl p-5 shadow-xl border border-gray-50 min-w-[100%]"
          style={{ elevation: 6, marginTop: -30}}
        >
          <View className="flex flex-col items-center mt-4">
            <View className="items-center">
              <Text className="text-lg font-bold text-dark-100">
                Richmond Ampah-Mensah
              </Text>
              <Text className="text-gray-100 mt-0.5">C2C023012</Text>
              <Text className="text-lg font-bold text-primary">
                Fakultas Teknik dan Ilmu Komputer
              </Text>
              <Text className="text-gray-100 mt-0.5">Informatika</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row mt-5 bg-tertiary rounded-xl overflow-hidden">
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">IP</Text>
              <Text className="text-base font-semibold text-primary">3.80</Text>
            </View>
            <View className="w-px bg-gray-200/70" />
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">IPK</Text>
              <Text className="text-base font-semibold text-primary">3.75</Text>
            </View>
            <View className="w-px bg-gray-200/70" />
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">SKS Kumulatif</Text>
              <Text className="text-base font-semibold text-primary">96</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
