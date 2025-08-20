import Header from '@/app/screens/Header'
import Button from '@/components/Button'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import DaftarNilai from './DaftarNilai'
import KHS from './KHS'

const Result = () => {
  const [tab, setTab] = useState<1 | 2>(1)

  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Header title="Kartu Hasil Studi Daftar" color="white" />

        <View className="mt-5 rounded-t-3xl bg-bgColor px-4 pt-4 min-h-full">
            <Button
              text1="KHS"
              text2="Daftar Nilai"
              active={tab}
              onChange={setTab}
            />
            {tab === 1 ? <KHS /> : <DaftarNilai />}

        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Result