import Header from "@/components/Header";
import { jadwal } from "@/db";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";

const Jadwal = () => {

  const renderItem = ({ item }: any) => (
    <View className="btn-row mb-4">
      <View className="flex flex-col items-center bg-primary rounded-lg p-2 h-full gap-1">
        <Text className="text-sm text-white">{item.day}</Text>
        <Ionicons name="time-outline" size={24} color="black" />
        <Text className="text-sm text-white">{item.time}</Text>
      </View>

      <View className="flex flex-col items-start py-1 w-[40%]">
        <Text className="text-sm font-medium text-black">{item.subject}</Text>
        <Text className="text-sm text-gray-500">{item.code}</Text>
        <Text className="text-xs text-gray-500">{item.lecturer}{" "}</Text>
      </View>

      <View className="w-1 h-[80%] bg-gray-100/10 rounded-md" />

      <View className="flex flex-col max-w-[25%] items-center justify-center">
        <Ionicons name="location-sharp" size={20} color="green" />
        <Text className="text-sm text-center text-gray-500">
          {item.location}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title="Jadwal Kuliah" color="white"/>

        {/* Jadwal List */}
        <View className="flex mt-5 bg-bgColor rounded-t-3xl min-h-full">
          <Text className="text-black text-lg font-medium mt-5 mb-5 mx-4">
            Jadwal Kuliah Semester Ini
          </Text>

          {/* FlatList rendering jadwal from db */}
          <FlatList
            data={jadwal}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 45 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Jadwal;
