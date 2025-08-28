import { FONTS } from "@/constants/Font";
import { studentresultdata } from "@/db";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(
    "khs2025_2026_ganjil"
  );
  const courseData = studentresultdata[selectedPeriod];

  // Grade -> grade point mapping (assumption, adjust if campus policy differs)
  const GRADE_POINTS: Record<string, number> = useMemo(
    () => ({
      A: 4.0,
      AB: 3.5,
      B: 3.0,
      BC: 2.5,
      C: 2.0,
      CD: 1.5,
      D: 1.0,
      DE: 0.5,
      E: 0.0,
    }),
    []
  );

  // Helper to parse period key for chronological ordering
  const parsePeriod = useCallback((period: string) => {
    const m = period.match(/^khs(\d{4})_(\d{4})_(ganjil|genap)$/);
    if (!m)
      return { start: Number.NEGATIVE_INFINITY, end: Number.NEGATIVE_INFINITY, sem: 0 };
    return { start: parseInt(m[1], 10), end: parseInt(m[2], 10), sem: m[3] === "ganjil" ? 0 : 1 };
  }, []);

  // Ordered periods (oldest -> newest)
  const orderedPeriods = useMemo(() => {
    return (Object.keys(studentresultdata) as Period[]).sort((a, b) => {
      const pa = parsePeriod(a);
      const pb = parsePeriod(b);
      if (pa.start !== pb.start) return pa.start - pb.start;
      if (pa.sem !== pb.sem) return pa.sem - pb.sem;
      return 0;
    });
  }, [parsePeriod]);

  // Semester (selected) metrics
  const { semesterSKS, semesterGradePoints, semesterIP } = useMemo(() => {
    const semesterSKS = courseData.reduce((acc, c) => acc + c.sks, 0);
    const semesterGradePoints = courseData.reduce(
      (acc, c) => acc + (GRADE_POINTS[c.grade] ?? 0) * c.sks,
      0
    );
    const semesterIP = semesterSKS ? semesterGradePoints / semesterSKS : 0;
    return { semesterSKS, semesterGradePoints, semesterIP };
  }, [courseData, GRADE_POINTS]);

  // Cumulative metrics up to selected period
  const { cumulativeSKS, cumulativeGradePoints, cumulativeIPK } = useMemo(() => {
    const idx = orderedPeriods.indexOf(selectedPeriod);
    const cumulativeCourses = orderedPeriods
      .slice(0, idx + 1)
      .flatMap((p) => studentresultdata[p]);
    const cumulativeSKS = cumulativeCourses.reduce((acc, c) => acc + c.sks, 0);
    const cumulativeGradePoints = cumulativeCourses.reduce(
      (acc, c) => acc + (GRADE_POINTS[c.grade] ?? 0) * c.sks,
      0
    );
    const cumulativeIPK = cumulativeSKS ? cumulativeGradePoints / cumulativeSKS : 0;
    return { cumulativeSKS, cumulativeGradePoints, cumulativeIPK };
  }, [GRADE_POINTS, orderedPeriods, selectedPeriod]);

  // Calculate the total number of each grade
  const calculateGradeCounts = useCallback(() => {
    const counts = { A: 0, AB: 0, B: 0, BC: 0, C: 0, CD: 0, D: 0, DE: 0, E: 0 };
    let totalSKS = 0;

    Object.values(studentresultdata).forEach((semester) => {
      semester.forEach((course) => {
        if (course.grade in counts) {
          counts[course.grade as keyof typeof counts] += 1;
        }
        totalSKS += course.sks;
      });
    });

    return { counts, totalSKS };
  }, []);

  const { counts, totalSKS } = calculateGradeCounts(); // still available if needed for future UI
  // Render item for FlatList
  const renderCourseItem = ({ item }: { item: CourseData }) => {
    // Define background color based on grade
    const getBgColor = (grade: string) => {
      switch (grade) {
        case "A":
        case "AB":
        case "B":
          return "bg-secondary";
        case "BC":
        case "C":
        case "CD":
          return "bg-yellowBG";
        case "D":
        case "DE":
        case "E":
          return "bg-red-500";
        default:
          return "bg-primary";
      }
    };

    return (
      <View className="btn-row mb-4 mx-0 mt-1 shadow-md items-center">
        <View
          className={`flex flex-col ${getBgColor(item.grade)} rounded-lg p-2 h-full w-[20%] items-center`}
        >
          <Text style={styles.DaftarNilaiText}>{item.grade}</Text>
          <Text className="text-sm text-white font-bold">{item.sks * GRADE_POINTS[item.grade]}</Text>
        </View>

        <View className="flex flex-col items-start py-1 w-[55%] px-2">
          <Text className="font-normal text-black">
            {item.subject}
          </Text>
          <Text className="text-sm text-gray-500">{item.code}</Text>
          {/* <Text className="text-sm text-black">{item.lecturer}</Text> */}
        </View>

        <View className="w-1 h-[80%] bg-gray-100/10 rounded-md" />

        <View className="flex max-w-[25%]">
          <Text className="font-normal text-[16px] text-center text-secondary">
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
      const parts = period.replace("khs", "").split("_");
      if (parts.length >= 3) {
        const year1 = parts[0];
        const year2 = parts[1];
        const semester = parts[2] === "ganjil" ? "Ganjil" : "Genap";
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
              className={`px-4 py-2 rounded-lg mr-3 ${selectedPeriod === period ? "bg-primary" : "bg-white border border-gray-300/70"}`}
            >
              <Text
                className={`${selectedPeriod === period ? "text-white" : "text-gray-700"} font-medium`}
              >
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
      <View className="flex mx-0 gap-4">
        <View className="btn-col gap-4 mx-0 p-4">

          <View className="flex flex-row gap-4 ">
            <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
              <Text className="font-normal text-[14px] text-gray-100">
                Jumlah SKS
              </Text>
              <Text className="font-extrabold text-[20px] text-primary">
                {semesterSKS}
              </Text>
            </View>
            <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
              <Text className="font-normal text-[14px] text-gray-100">IP</Text>
              <Text className="font-extrabold text-[20px] text-primary">
                {semesterSKS ? semesterIP.toFixed(2) : "-"}
              </Text>
            </View>
          </View>

          <View className="flex flex-row gap-4 ">
            <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
              <Text className="font-normal text-[14px] text-gray-100">
                SKS Kumulatif
              </Text>
              <Text className="font-extrabold text-[20px] text-primary">
                {cumulativeSKS}
              </Text>
            </View>
            <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
              <Text className="font-normal text-[14px] text-gray-100">IPK</Text>
              <Text className="font-extrabold text-[20px] text-primary">
                {cumulativeSKS ? cumulativeIPK.toFixed(2) : "-"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View className="btn-col mt-6 p-2 mx-0 gap-5">
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
          </View> */}

      {/* Semester selection dropdown */}
      {renderSemesterDropdown()}

      <Text className="text-black/60 font-extrabold mt-5 text-[18px] mb-4">
        Daftar Nilai Mata Kuliah
      </Text>

      <FlatList
        data={courseData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCourseItem}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 5 }}
        ListEmptyComponent={
          <View className="py-4 items-center">
            <Text className="text-gray-500">
              Tidak ada data DaftarNilai untuk semester ini
            </Text>
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
    textAlign: "center",
  },
});
