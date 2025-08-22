import Dropdown from "@/components/Dropdown";
import { studentresultdata } from "@/db";
import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";

const KHS = () => {
  // Transform studentresultdata object keys into array items
  const dataArray = useMemo(() => {
    return Object.entries(studentresultdata).map(([key, value]) => ({ key, list: value as any[] }));
  }, []);

  // Determine latest year from keys (format: khsYYYY_YYYY_semester)
  const latestYearPrefix = useMemo(() => {
    const years = dataArray.map(item => {
      const match = item.key.match(/khs(\d{4})_(\d{4})_/);
      if (match) return parseInt(match[2]); // use second year as indicator
      return 0;
    });
    return Math.max(...years);
  }, [dataArray]);

  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = useCallback((id: string) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);


  return (
    <View className="flex">
          <Text className="text-black font-extrabold mt-5 text-[18px]">
            DATA KHS MAHASISWA
          </Text>

          {dataArray.map(item => {
            const match = item.key.match(/khs(\d{4})_(\d{4})_(ganjil|genap)/);
            const year2 = match ? parseInt(match[2]) : 0;
            const semester = match ? match[3] : '';
            const headerLabel = `${semester.toUpperCase()} ${match ? match[1] + '/' + match[2] : ''}`;
            const color = year2 === latestYearPrefix ? 'secondary' : 'primary';
            return (
              <Dropdown
                key={item.key}
                id={item.key}
                header={headerLabel}
                isControlled
                isOpen={openId === item.key}
                onToggle={toggle}
                color={color as any}
                className="py-10"
              >
                <View className="flex flex-col gap-4">
                  {item.list.map(rec => (
                    <View key={rec.id} className="flex flex-col bg-white p-3 gap-2 rounded-xl shadow-sm">
                      <View className="flex flex-row justify-between">
                        <Text className="text-black font-bold flex-1 pr-2">{rec.subject}</Text>
                        <Text className="text-primary font-bold">{rec.code}</Text>
                      </View>
                      <View className="bg-gray-300 h-0.5 w-full" />
                      <View className="flex flex-row justify-between items-center">
                        <View className="flex flex-col justify-between items-center bg-primary p-2 rounded-xl w-[27%]">
                          <Text className="text-white font-bold text-[14px]">Total</Text>
                          <Text className="text-white font-extrabold text-[24px]">{rec.score}</Text>
                          {/* <Text className="text-white font-semibold text-[12px]">{rec.grade}</Text> */}
                        </View>
                        <View className="flex flex-col justify-between items-start w-[40%] gap-1">
                          <Text className="text-black text-[14px]">UTS: {rec.uts}</Text>
                          <Text className="text-black text-[14px]">UAS: {rec.uas}</Text>
                          <Text className="text-black text-[14px]">Tugas: {rec.tugas}</Text>
                        </View>
                        <View className="bg-gray-300 w-0.5 h-[90%]" />
                        <Text className="text-secondary font-bold text-[16px] text-center w-[20%]">{rec.sks} SKS</Text>
                      </View>
                      {/* <Text className="text-black text-[13px]">Dosen: {rec.lecturer}</Text> */}
                    </View>
                  ))}
                </View>
              </Dropdown>
            );
          })}
          <View className="pb-6" />
        </View>
  );
};

export default KHS;
