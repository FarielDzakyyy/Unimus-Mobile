import Dropdownselect from "@/components/Dropdownselect";
import { images } from "@/constants";
import { KALENDERAKADEMIK } from "@/db"; // assumes barrel export in db/index.ts
import React, { useMemo, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";

// Dynamically derive academic years and semester availability from keys like Gasal_2025_2026
const extractYearLabel = (key: string) => {
  const match = key.match(/^(Gasal|Genap)_(\d{4})_(\d{4})$/);
  if (!match) return null;
  return `${match[2]}/${match[3]}`; // e.g. 2025/2026
};

const extractSemester = (key: string) => {
  const match = key.match(/^(Gasal|Genap)_/);
  return match ? match[1] : null;
};

const KalenderAkademik = () => {
  const [semesterLabel, setSemesterLabel] = useState<string>("");
  const [tahunAkademik, setTahunAkademik] = useState<string>(""); // format: 2025/2026
  const [submitted, setSubmitted] = useState(false);

  // All keys from DB
  const kalenderKeys = useMemo(() => Object.keys(KALENDERAKADEMIK), []);

  // Academic years derived from keys (unique)
  const academicYears = useMemo(() => {
    const set = new Set<string>();
    kalenderKeys.forEach((k) => {
      const label = extractYearLabel(k);
      if (label) set.add(label);
    });
    // Sort descending by first year
    return Array.from(set).sort((a, b) => {
      const ay = parseInt(a.split("/")[0]);
      const by = parseInt(b.split("/")[0]);
      return by - ay;
    });
  }, [kalenderKeys]);

  // Fixed semester options (always Gasal & Genap)
  const SEMESTER_OPTIONS = ["Gasal", "Genap"]; 

  // Data after submit
  const data = useMemo(() => {
    if (!submitted) return [];
    if (!semesterLabel || !tahunAkademik) return [];
    const key = `${semesterLabel}_${tahunAkademik.replace("/", "_")}`; // e.g. Gasal_2025_2026
    return (KALENDERAKADEMIK as any)[key] || [];
  }, [semesterLabel, tahunAkademik, submitted]);

  const handleSearch = () => {
    setSubmitted(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Header title="Kalender Akademik" color="white" className="gap-3"/>
        <View className="flex mt-5 bg-gray-200 min-h-full p-4 rounded-t-3xl">
          <View className="flex flex-col items-center justify-start gap-2 w-full">
            <View className="flex flex-col items-start justify-start gap-3 w-full">
              <Text className="text-primary px-1 font-semibold">Semester</Text>
              <Dropdownselect
                header="Pilih Semester"
                options={SEMESTER_OPTIONS}
                value={semesterLabel}
                onSelect={(v) => {
                  setSemesterLabel(v);
                  setSubmitted(false);
                }}
              />
              <Text className="text-primary px-1 font-semibold">Tahun Akademik</Text>
              <Dropdownselect
                header="Pilih Tahun Akademik"
                options={academicYears}
                value={tahunAkademik}
                onSelect={(v) => {
                  setTahunAkademik(v);
                  // If current semester no longer valid for newly selected year, reset it
                  if (semesterLabel) {
                    const validKey = `${semesterLabel}_${v.replace("/", "_")}`;
                    if (!(validKey in (KALENDERAKADEMIK as any))) {
                      setSemesterLabel("");
                    }
                  }
                  setSubmitted(false);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={handleSearch}
              disabled={!semesterLabel || !tahunAkademik}
              className={`rounded-lg p-2 px-10 mt-2 ${!semesterLabel || !tahunAkademik ? "bg-gray-400" : "bg-bgColor-BLUE"}`}
            >
              <Text className="text-white font-semibold">Lihat</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="mt-4 w-full">
            {!submitted && (
              <Text className="text-center text-gray-600 text-sm">Silakan pilih Semester dan Tahun Akademik lalu tekan Lihat.</Text>
            )}
            {submitted && data.length === 0 && (
              <Text className="text-center text-gray-600 text-sm">Data tidak ditemukan.</Text>
            )}
            {submitted && data.length > 0 && (
              <View className="flex flex-col gap-3">
                {data.map((item: any) => (
                  <View key={item.id} className="btn-row bg-bgColor mx-0 shadow-md items-center p-2 rounded-lg">
                    <View className="flex border rounded-lg p-2 h-full w-[15%] items-center">
                      <Image source={images.academic} className="w-10 h-10" />
                    </View>
                    <View className="flex flex-col items-start py-1 w-[85%] px-2">
                      <Text className="font-medium text-black" numberOfLines={2}>{item.kegiatan}</Text>
                      <Text className="text-xs text-gray-500 mt-2" numberOfLines={2}>{item.waktu}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KalenderAkademik;
