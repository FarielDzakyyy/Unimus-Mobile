import Dropdown from "@/components/Dropdown";
import { images } from "@/constants";
import { studentresultdata } from "@/db";
import React, { useCallback, useMemo, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "./Header";

const KRS = () => {
  // Build array from object entries
  const dataArray = useMemo(() => {
    return Object.entries(studentresultdata).map(([key, list]) => ({ key, list: list as any[] }));
  }, []);

  // Determine latest semester by highest second year; if tie prefer ganjil? We'll just pick the max year then first matching ganjil, else genap.
  const latestKey = useMemo(() => {
    let grouped: Record<string, string[]> = {};
    dataArray.forEach(({ key }) => {
      const m = key.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
      if (m) {
        const yr2 = m[2];
        grouped[yr2] = grouped[yr2] || [];
        grouped[yr2].push(key);
      }
    });
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
    for (const y of sortedYears) {
      // prefer ganjil if exists else first
      const keys = grouped[y];
      const ganjil = keys.find(k => k.endsWith("ganjil"));
      return ganjil || keys[0];
    }
    return dataArray[0]?.key || "";
  }, [dataArray]);

  const latestData = useMemo(() => (studentresultdata as any)[latestKey] || [], [latestKey]);

  const { semesterLabel, taLabel } = useMemo(() => {
    const match = latestKey.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
    if (!match) return { semesterLabel: "Semester", taLabel: "T.A." };
    const [_, y1, y2, sem] = match;
    return { semesterLabel: sem === "ganjil" ? "Semester Ganjil" : "Semester Genap", taLabel: `T.A. ${y1}/${y2}` };
  }, [latestKey]);

  const totalSKS = useMemo(() => latestData.reduce((s: number, c: any) => s + (c.sks || 0), 0), [latestData]);
  const courseCount = latestData.length;

  // Multiple dropdowns - control which is open
  const [openId, setOpenId] = useState<string | null>(latestKey);
  const toggle = useCallback((id: string) => setOpenId(prev => (prev === id ? null : id)), []);

  // Sort dropdowns descending by year then ganjil before genap within same year
  const sortedDataArray = useMemo(() => {
    return [...dataArray].sort((a, b) => {
      const ma = a.key.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
      const mb = b.key.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
      if (!ma || !mb) return 0;
      const ya2 = parseInt(ma[2]);
      const yb2 = parseInt(mb[2]);
      if (ya2 !== yb2) return yb2 - ya2; // desc by year2
      // same year2: ganjil first
      if (ma[3] === mb[3]) return 0;
      return ma[3] === "ganjil" ? -1 : 1;
    });
  }, [dataArray]);

  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <Header title="Kartu Hasil Studi Daftar" color="white" />
        <View className="flex mt-5 rounded-t-3xl bg-bgColor px-4 pt-4 min-h-full">
          <View className="btn-row mx-0 gap-4 p-2">
            <View className="flex-1 flex-col bg-yellowBG rounded-xl p-2 items-start">
              <Image source={images.studytime} className="w-12 h-12 mb-1" />
              <Text className="font-bold text-[16px] text-white">{semesterLabel}</Text>
              <Text className="font-normal text-[14px] text-white">{taLabel}</Text>
            </View>
            <View className="flex-1 flex-col bg-orangeBG rounded-xl p-2 items-start">
              <Image source={images.sks} className="w-12 h-12 mb-1" />
              <Text className="font-bold text-[16px] text-white">{totalSKS} SKS</Text>
              <Text className="font-normal text-[14px] text-white">{courseCount} Mata Kuliah</Text>
            </View>
          </View>
          <Text className="text-black font-extrabold mt-5 text-[18px]">DATA KRS MAHASISWA</Text>

          {sortedDataArray.map(item => {
            const m = item.key.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
            const header = m ? `${m[3].toUpperCase()} ${m[1]}/${m[2]}` : item.key;
            const year2 = m ? parseInt(m[2]) : 0;
            const latestMatch = latestKey.match(/khs(\d{4})_(\d{4})_/);
            const latestYear2 = latestMatch ? parseInt(latestMatch[2]) : 0;
            const color = year2 === latestYear2 ? "secondary" : "primary";
            const list = item.list as any[];
            return (
              <Dropdown
                key={item.key}
                id={item.key}
                header={header}
                isControlled
                isOpen={openId === item.key}
                onToggle={() => toggle(item.key)}
                color={color as any}
                className="py-10"
              >
                {list.length === 0 && (
                  <Text className="text-center text-gray-500 mb-4">Tidak ada data</Text>
                )}
                {list.map((course: any) => (
                  <View key={course.id} className="btn-row mb-4 mx-0 mt-1 shadow-md items-center">
                    <View className={`flex bg-orangeBG rounded-lg p-2 h-full w-[20%] items-center`}>
                      <Image source={images.sks} className="w-12 h-12" />
                    </View>
                    <View className="flex flex-col items-start py-1 w-[55%] px-2">
                      <Text className="text-bold font-medium text-black">{course.subject}</Text>
                      <Text className="text-sm text-gray-500">{course.code}</Text>
                      {/* <Text className="text-sm text-black">{course.lecturer}</Text> */}
                    </View>
                    <View className="w-1 h-[80%] bg-gray-100/10 rounded-md" />
                    <View className="flex max-w-[25%] justify-center items-center">
                      <Text className="font-bold text-[16px] text-center text-secondary">{course.sks} SKS</Text>
                    </View>
                  </View>
                ))}
              </Dropdown>
            );
          })}
        </View>
        <View className="pb-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KRS;
