import { FONTS } from "@/constants/Font";
import { studentresultdata } from "@/db";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type Period = keyof typeof studentresultdata;
type CourseData = {
  id: number;
  subject: string;
  code: string;
  lecturer: string;
  uts: number;
  uas: number;
  tugas: number;
  score: number;
  grade: string;
  sks: number;
};

const DaftarNilai = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("khs2025_2026_ganjil");
  const courseData = studentresultdata[selectedPeriod];
  
  // Calculate the total number of each grade
  const calculateGradeCounts = useCallback(() => {
    const counts = { A: 0, AB: 0, B: 0, BC: 0, C: 0, CD: 0, D: 0, DE: 0, E: 0 };
    let totalSKS = 0;
    
    Object.values(studentresultdata).forEach(semester => {
      semester.forEach(course => {
        if (course.grade in counts) {
          counts[course.grade as keyof typeof counts] += 1;
        }
        totalSKS += course.sks;
      });
    });
    
    return { counts, totalSKS };
  }, []);
  
  const { counts, totalSKS } = calculateGradeCounts();
  // Render item for FlatList
  const renderCourseItem = ({ item }: { item: CourseData }) => {
    // Define background color based on grade
    const getBgColor = (grade: string) => {
      switch(grade) {
        case 'A':
        case 'AB':
        case 'B':
          return 'bg-secondary';
        case 'BC':
        case 'C':
        case 'CD':
          return 'bg-yellowBG';
        case 'D':
        case 'DE':
        case 'E':
          return 'bg-red-500';
        default:
          return 'bg-primary';
      }
    };
    
    return (
      <View className="btn-row mb-4 mx-0 mt-1 shadow-md items-center">
        <View className={`flex  ${getBgColor(item.grade)} rounded-lg p-2 h-full w-[20%] items-center`}>
          <Text style={styles.DaftarNilaiText}>{item.grade}</Text>
        </View>

        <View className="flex flex-col items-start py-1 w-[55%] px-2">
          <Text className="text-bold font-medium text-black">{item.subject}</Text>
          <Text className="text-sm text-gray-500">{item.code}</Text>
          <Text className="text-sm text-black">{item.lecturer}</Text>
        </View>

        <View className="w-1 h-[80%] bg-gray-100/10 rounded-md" />

        <View className="flex max-w-[25%] justify-center items-center">
          <Text className="font-bold text-[18px] text-center text-secondary">
            {item.sks} SKS
          </Text>
        </View>
      </View>
    );
  };
  
  // Render dropdown for semester selection
  const renderSemesterDropdown = () => {
    const periods = Object.keys(studentresultdata) as Period[];
    
    const formatPeriodName = (period: string) => {
      // Convert from khs2025_2026_ganjil to "2025/2026 Ganjil"
      const parts = period.replace('khs', '').split('_');
      if (parts.length >= 3) {
        const year1 = parts[0];
        const year2 = parts[1];
        const semester = parts[2] === 'ganjil' ? 'Ganjil' : 'Genap';
        return `${year1}/${year2} ${semester}`;
      }
      return period;
    };
    
    return (
      <View className="mt-4 mb-2">
        <Text className="text-secondary font-bold mb-2">Pilih Semester:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity 
              key={period} 
              onPress={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg mr-2 ${selectedPeriod === period ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <Text className={`${selectedPeriod === period ? 'text-white' : 'text-gray-700'} font-medium`}>
                {formatPeriodName(period)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex">
      <View className="flex flex-row mt-4 p-2 mx-0 gap-4">
            <View className="flex-1 flex-col bg-primary rounded-xl p-2 items-center">
              <Text className="font-normal text-[15px] text-white">
                IP Kumulatif
              </Text>
              <Text className="font-bold text-[20px] text-white">3.88</Text>
            </View>
            <View className="flex-1 flex-col bg-secondary rounded-xl p-2 items-center">
              <Text className="font-normal text-[15px] text-white">
                Telah Mengambil
              </Text>
              <Text className="font-bold text-[20px] text-white">{totalSKS}</Text>
            </View>
        </View>

          <View className="btn-col mt-6 p-2 mx-0 gap-5">
            <View className="flex flex-row gap-10">
              <View className="flex-1 flex-row bg-secondary rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">A: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.A}</Text>
              </View>
              <View className="flex-1 flex-row bg-secondary rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">AB: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.AB}</Text>
              </View>
              <View className="flex-1 flex-row bg-secondary rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">B: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.B}</Text>
              </View>
            </View>

            <View className="flex flex-row gap-10">
              <View className="flex-1 flex-row bg-yellowBG rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">BC: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.BC}</Text>
              </View>
              <View className="flex-1 flex-row bg-yellowBG rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">C: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.C}</Text>
              </View>
              <View className="flex-1 flex-row bg-yellowBG rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">CD: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.CD}</Text>
              </View>
            </View>

            <View className="flex flex-row gap-10">
              <View className="flex-1 flex-row bg-red-500 rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">D: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.D}</Text>
              </View>
              <View className="flex-1 flex-row bg-red-500 rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">DE: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.DE}</Text>
              </View>
              <View className="flex-1 flex-row bg-red-500 rounded-xl p-2 justify-center shadow-md shadow-black">
                <Text className="font-bold text-[20px] text-white">E: </Text>
                <Text className="font-bold text-[20px] text-white">{counts.E}</Text>
              </View>
            </View>
          </View>
          
          {/* Semester selection dropdown */}
          {renderSemesterDropdown()}
          
          <Text className="text-secondary font-extrabold mt-5 text-[18px]">
            Daftar DaftarNilai Mata Kuliah
          </Text>

          <FlatList
            data={courseData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCourseItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 5 }}
            ListEmptyComponent={
              <View className="py-4 items-center">
                <Text className="text-gray-500">Tidak ada data DaftarNilai untuk semester ini</Text>
              </View>
            }
          />
    </View>
  );
};

export default DaftarNilai;

const styles = StyleSheet.create({
  DaftarNilaiText: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: 30,
    color: "white",
    textAlign: "center"
  }
})