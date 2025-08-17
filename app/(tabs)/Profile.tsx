import Header from "@/components/Header";
import { images } from "@/constants";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Profile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-bgColor">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title="Profile" color="black" className="gap-0 items-center" />

        <View className="flex flex-col items-center mt-5">
          <View className="h-auto w-auto rounded-full bg-white items-center p-1 shadow-xl shadow-black">
            <Image
              source={images.personCircleOutline}
              style={{ height: 70, width: 70 }}
              className="rounded-full "
            />
          </View>
          <View className="btn-col mt-8 min-w-[90%] p-4 items-start gap-8">
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Full Name</Text>
              <Text className="font-bold">Richmond Ampah-Mensah</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">NIM</Text>
              <Text className="font-bold">C2C023012</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Email</Text>
              <Text className="font-bold">richmond@example.com</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Phone Number</Text>
              <Text className="font-bold">+1234567890</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Dosen Wali</Text>
              <Text className="font-bold">Dr. Muhamad Munsyarif, S.Kom, M.Kom, Phd</Text>
            </View>
          </View>

          <View className="flex flex-col mt-10 gap-4">
          <TouchableOpacity className="flex items-center justify-center bg-primary/10 min-w-[90%] p-4 rounded-full border border-primary">
            <Text className="text-primary font-bold text-base">
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-center bg-error/10 min-w-[90%] p-4 rounded-full border border-error gap-3">
            <SimpleLineIcons name="logout" size={20} color="red" />
            <Text className="text-error font-bold text-base">
              Logout
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
