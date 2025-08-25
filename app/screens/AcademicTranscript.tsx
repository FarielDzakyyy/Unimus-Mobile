import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { studentresultdata } from "../../db";
import Header from "./Header";

// Grade to color class mapping utility
const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A":
    case "AB":
    case "B":
      return "text-secondary"; // green-ish / success
    case "BC":
    case "C":
    case "CD":
      return "text-yellowBG"; // warning
    case "D":
    case "DE":
    case "E":
      return "text-red-500"; // danger
    default:
      return "text-primary";
  }
};

// Grade to numeric point mapping (temporary assumption based on common local scale)
const gradePoints: Record<string, number> = {
  A: 4,
  AB: 3.5,
  B: 3,
  BC: 2.5,
  C: 2,
  CD: 1.5,
  D: 1,
  DE: 0.5,
  E: 0,
};

interface CourseRow {
  id: number;
  subject: string;
  code: string;
  sks: number;
  grade: string;
}

const AcademicTranscript = () => {
  // Build unified list of all courses (aggregate transcript)
  const courses: CourseRow[] = useMemo(() => {
    const list: CourseRow[] = [];
    Object.values(studentresultdata).forEach((arr) => {
      (arr as any[]).forEach((c: any, idx: number) => {
        list.push({
          id: c.id + list.length / 1000 + idx / 10000,
          subject: c.subject,
          code: c.code,
          sks: c.sks,
          grade: c.grade,
        });
      });
    });
    return list;
  }, []);

  const { totalSks, gpa } = useMemo(() => {
    const totals = courses.reduce(
      (acc, c) => {
        const gp = gradePoints[c.grade] ?? 0;
        acc.qualityPoints += gp * c.sks;
        acc.sks += c.sks;
        return acc;
      },
      { qualityPoints: 0, sks: 0 }
    );
    return {
      totalSks: totals.sks,
      gpa: totals.sks ? (totals.qualityPoints / totals.sks).toFixed(2) : "0.00",
    };
  }, [courses]);

  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Header title="Transkrip Akademik" color="white" />

        <View className="flex mt-5 rounded-t-3xl bg-bgColor px-4 pt-4 min-h-full">
          <View className="btn-col mx-0 gap-4 p-4 items-start">
            {/* <Text className="font-extrabold text-[16px] text-black">
              Ringkasan Prestasi
            </Text> */}
            <View className="flex flex-row gap-4">
              <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
                <Text className="font-normal text-[14px] text-gray-100">
                  IP Kumulatif
                </Text>
                <Text className="font-extrabold text-[20px] text-primary">
                  {gpa}
                </Text>
              </View>
              <View className="flex-1 flex-col bg-gray-300/30 rounded-md p-4 items-center">
                <Text className="font-normal text-[14px] text-gray-100">
                  Total SKS
                </Text>
                <Text className="font-extrabold text-[20px] text-BLACK">
                  {totalSks}
                </Text>
              </View>
            </View>
          </View>

          {/* Daftar Mata Kuliah */}
          <Text className="text-black font-extrabold mt-6 text-[18px]">
            Daftar Mata Kuliah
          </Text>
          {/* Unified transcript list (no semester filters) */}

          {courses.map((course) => (
            <View
              key={`${course.code}-${course.id}`}
              className="btn-row mx-0 mt-3 p-4 justify-between border-b border-gray-200/40"
            >
              <View className="flex flex-col gap-1 flex-1 pr-3">
                <Text className="text-black font-medium" numberOfLines={1}>
                  {course.subject}
                </Text>
                <Text className="text-gray-100 font-normal text-xs">
                  {course.sks} SKS  
                </Text>
              </View>
              <Text
                className={`font-extrabold text-[20px] ${getGradeColor(course.grade)}`}
              >
                {course.grade}
              </Text>
            </View>
          ))}
          {!courses.length && (
            <Text className="text-center text-gray-400 mt-8">
              Belum ada data transkrip.
            </Text>
          )}
          <View className="h-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AcademicTranscript;
