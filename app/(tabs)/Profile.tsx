import Header from "@/app/screens/Header";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const API_BASE_URL = "http://192.168.100.222"; // Ganti dengan IP server kamu
const NIM = "C2C023053"; // NIM dinamis, bisa dari login atau route param

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil data profil dari API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_profile.php?nim=${NIM}`);
        const data = await response.json();

        if (data.status === "success") {
          setProfile(data.data);
        } else {
          Alert.alert("Gagal", data.message || "Data tidak ditemukan");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Fungsi logout dengan konfirmasi
  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Logout",
          style: "destructive",
          onPress: () => {
            router.replace("/sign-in");
          }
        }
      ]
    );
  };

  // ✅ Tampilkan loading jika masih memuat data
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bgColor">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-500">Memuat profil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bgColor">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-center py-auto mt-14 my-1 ">
        <Text className="text-black text-lg font-bold">Profile</Text>
        </View>

        <View className="flex flex-col items-center mt-5">
          {/* Foto Profil (dari API) */}
          <View className="h-auto w-auto rounded-full bg-white items-center p-1 shadow-xl shadow-black">
          <Image
            source={require("../../assets/images/Fariel.jpg")}
            style={{ height: 80, width: 80 }}
            className="rounded-full"
          />
          </View>

          {/* Detail Profil */}
          <View className="btn-col mt-8 min-w-[90%] p-4 items-start gap-8">
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Full Name</Text>
              <Text className="font-bold">{profile?.nama}</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">NIM</Text>
              <Text className="font-bold">{profile?.nim}</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Email</Text>
              <Text className="font-bold">{profile?.email}</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Phone Number</Text>
              <Text className="font-bold">{profile?.phone}</Text>
            </View>
            <View className="flex flex-col items-start gap-1">
              <Text className="font-normal text-gray-100">Dosen Wali</Text>
              <Text className="font-bold">{profile?.dosen_wali}</Text>
            </View>
          </View>

          {/* Tombol Aksi */}
          <View className="flex flex-col mt-10 gap-4">
            <TouchableOpacity className="flex items-center justify-center bg-primary/10 min-w-[90%] p-4 rounded-full border border-primary">
              <Text className="text-primary font-bold text-base">
                Edit Profile
              </Text>
            </TouchableOpacity>

            {/* Tombol Logout */}
            <TouchableOpacity
              onPress={handleLogout}
              className="flex flex-row items-center justify-center bg-error/10 min-w-[90%] p-4 rounded-full border border-error gap-3"
            >
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