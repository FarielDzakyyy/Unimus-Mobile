import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const Ujian = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">Ujian (Exams)</Text>
      <Text className="mt-2 text-gray-500">This page is outside the bottom tabs.</Text>
    </SafeAreaView>
  )
}

export default Ujian
