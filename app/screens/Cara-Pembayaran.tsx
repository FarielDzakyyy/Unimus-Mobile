import Header from '@/app/screens/Header';
import Dropdown from '@/components/Dropdown';
import { PembayaranBankBSI, PembayaranBankJatengSyariah } from '@/db';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const CaraPembayaran = () => {
  // Track which dropdown is currently open
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Function to format steps for display
  const formatSteps = (steps: string[]) => {
    return steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n');
  };

  // Function to handle dropdown toggle
  const handleToggleDropdown = (id: string) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-bgColor mt-2 '>
        <ScrollView 
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <Header title="Cara Pembayaran" color='black' className='gap-3' />

            <View className='btn-col items-start justify-start px-4 pb-4 elevation-md'>
                <Text className='text-black text-lg font-bold text-center mt-4'>
                    Catatan
                </Text>
                <Text className='text-black text-base text-start'>
                    • Kode Pembayaran Anda: 123456789
                </Text>
                <Text className='text-black text-base text-start'>
                    • Disarankan menggunakan Bank BSI dan Bank Jateng Syariah.
                </Text>
                <Text className='text-black text-base text-start'>
                    • Layanan transfer Real Time, tidak disarankan menggunakan BI Fast/SKN/Kliring.
                </Text>
            </View>

            {/* BSI */}
            <View className="flex flex-col mt-4 mx-4 ">
              <Text className="text-secondary font-extrabold text-[18px]">
                Pembayaran melalui Bank BSI
              </Text>
              {PembayaranBankBSI.map((item) => (
                <View key={item.id} className="">
                  <Dropdown 
                    header={item.method}
                    description={formatSteps(item.steps)}
                    id={`bsi-${item.id}`}
                    isControlled={true}
                    isOpen={openDropdownId === `bsi-${item.id}`}
                    onToggle={handleToggleDropdown}
                  />
                </View>
              ))}
            </View>

            {/* Bank Jateng Syariah */}
            <View className="flex flex-col mt-4 mx-4 mb-4">
              <Text className="text-secondary font-extrabold text-[18px] mt-1">
                Pembayaran melalui Bank Jateng Syariah
              </Text>
              {PembayaranBankJatengSyariah.map((item) => (
                <View key={item.id} className="">
                  <Dropdown 
                    header={item.method}
                    description={formatSteps(item.steps)}
                    id={`jateng-${item.id}`}
                    isControlled={true}
                    isOpen={openDropdownId === `jateng-${item.id}`}
                    onToggle={handleToggleDropdown}
                  />
                </View>
              ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CaraPembayaran