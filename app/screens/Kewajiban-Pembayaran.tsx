import Header from '@/app/screens/Header'
import { pembayaran } from '@/db'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const KewajibanPembayaran = () => {
  const [selectedBill, setSelectedBill] = useState(pembayaran[0]);
  const router = useRouter();

  // Format number with thousand separator
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  return (
    <View className='flex-1 bg-bgColor'>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-1 bg-primary rounded-b-[30px] shadow-2xl shadow-black p-2'>
          <Header title="Kewajiban Pembayaran" color="white"/>

          <View className='flex flex-col items-center justify-center mb-4'>
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-white text-[32px] font-black'>
                {formatNumber(selectedBill.totalAmount)}
              </Text>
              <Text className='text-white text-sm font-black'>RP</Text>
            </View>
            <Text className='text-black text-xl font-medium'>Tagihan</Text>

            <View className='btn-row p-4 max-w-[100%] rounded-xl place-items-center gap-3 mx-0 mt-4'>

              <View className='btn-col p-2 max-w-[30%] min-w-[30%] items-center mx-0 min-h-[80px]'>
                <Text className='text-primary text-md font-bold text-center'>Semester</Text>
                <Text className='text-black font-bold text-center'>{selectedBill.semester}</Text>
              </View>

              <View className='btn-col p-2 max-w-[30%] min-w-[30%] items-center mx-0 min-h-[80px]'>
                <Text className='text-primary text-md font-bold text-center'>Period</Text>
                <Text className='text-black font-bold text-center'>{selectedBill.period}</Text>
              </View>

              <View className='btn-col p-2 max-w-[30%] min-w-[30%] items-center mx-0 min-h-[80px]'>
                <Text className='text-primary text-md font-bold text-center'>Status</Text>
                <Text className={`font-bold text-center ${selectedBill.totalAmount < 1 ? 'text-green-500' : 'text-red-500'}`}>{selectedBill.totalAmount < 1 ? 'Lunas' : 'Belum dibayar'}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Bill selector */}
        {/* <View className='px-4 mt-4'>
          <Text className='text-primary text-lg font-bold mb-2'>Pilih Semester:</Text>
          <FlatList
            data={pembayaran}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity 
                className={`py-2 px-4 rounded-lg mr-2 ${selectedBill.id === item.id ? 'bg-primary' : 'bg-gray-200'}`}
                onPress={() => setSelectedBill(item)}
              >
                <Text className={`font-medium ${selectedBill.id === item.id ? 'text-white' : 'text-black'}`}>
                  {item.semester}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View> */}
        
        {/* Content goes here */}
        <View className='flex-1 p-4 mt-6'>
          <Text className='text-primary text-xl font-extrabold mb-4'>RINCIAN TAGIHAN MAHASISWA</Text>
          <View className='flex flex-col gap-4'>

            <View className='flex flex-row justify-between items-center'>
              <Text className='text-black font-bold'>Tagihan</Text>
              <Text className='text-black font-bold'>Jumlah</Text>
            </View>
            
            <FlatList
              data={selectedBill.details}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View className='flex flex-row justify-between items-center py-2'>
                  <Text className='text-gray-100 font-medium'>{item.name}</Text>
                  <Text className='text-gray-100 font-medium'>{formatNumber(item.amount)}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            
            <View className='flex flex-row justify-between items-center mt-1'>
              <Text className='text-black font-bold'>Total</Text>
              <Text className='text-black font-bold'>{formatNumber(selectedBill.totalAmount)}</Text>
            </View>
            <Text className='text-black font-bold mt-4'>
              Keterangan: <Text className='text-black font-normal'>{selectedBill.note}</Text>
            </Text>

            <TouchableOpacity 
              className={`py-3 rounded-xl min-w-full items-center mt-4 bg-primary`}
              onPress={() => router.push('/screens/Cara-Pembayaran')}
            >
              <Text className='text-white font-bold'>
                CARA PEMBAYARAN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default KewajibanPembayaran