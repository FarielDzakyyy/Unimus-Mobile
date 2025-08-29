import { images } from "@/constants";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import Fariel from '@/assets/images/Fariel.jpg';

const ProfileCard = () => {
  const [data, setData] = useState<{
    nim: string;
    nama: string;
    fakultas: string;
    prodi: string;
    ip: string;
    ipk: string;
    sks: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const NIM = "C2C023053"; // ✅ Ganti sesuai NIM user yang login
  const API_URL = `http://192.168.100.222/get_mahasiswa.php?nim=${NIM}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (json.status === "success") {
          setData(json.data);
        } else {
          setError(json.message || "Data tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal mengambil data. Periksa koneksi server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <ActivityIndicator size="large" color="#007bff" />
        <Text className="mt-3 text-gray-500">Memuat data mahasiswa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="relative px-4 z-10 -mt-4">
      <View className="items-center ">
        <View className="relative z-10 w-22 h-22 rounded-full bg-white items-center justify-center p-1 shadow-xl shadow-black">
          <Image
            source={images.Fariel}
            style={{ height: 70, width: 70 }}
            className="rounded-full"
          />
        </View>
        <View
          className="bg-white rounded-2xl p-5 shadow-xl border border-gray-50 min-w-[100%]"
          style={{ elevation: 6, marginTop: -30 }}
        >
          <View className="flex flex-col items-center mt-4">
            <View className="items-center">
              <Text className="text-lg font-bold text-dark-100">
                {data?.nama}
              </Text>
              <Text className="text-gray-100 mt-0.5">{data?.nim}</Text>
              <Text className="text-lg font-bold text-primary">
                {data?.fakultas}
              </Text>
              <Text className="text-gray-100 mt-0.5">{data?.prodi}</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row mt-5 bg-tertiary rounded-xl overflow-hidden">
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">IP</Text>
              <Text className="text-base font-semibold text-primary">
                {data?.ip}
              </Text>
            </View>
            <View className="w-px bg-gray-200/70" />
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">IPK</Text>
              <Text className="text-base font-semibold text-primary">
                {data?.ipk}
              </Text>
            </View>
            <View className="w-px bg-gray-200/70" />
            <View className="flex-1 p-4 items-center justify-center">
              <Text className="text-xs text-gray-100 mb-1">SKS Kumulatif</Text>
              <Text className="text-base font-semibold text-primary">
                {data?.sks}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
