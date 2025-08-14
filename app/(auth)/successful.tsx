import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { FONTS } from '@/constants/Font'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Successful = () => {
    const router = useRouter()
  return (
    <View className='flex-1 items-center justify-center bg-bgColor p-6'>
        <View className='gap-4'>
      <Image
        source={images.success}
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 50 }}
        resizeMode='contain'
      />
      <Text style={styles.text}>
        Login Successful
      </Text>
      <View className='mt-5'>
        <Text className='text-center text-lg font-medium text-gray-600'>
          You’re all set to continue where you left off.
        </Text>

        <CustomButton
          title="Go to Homepage"
          onPress={() => router.navigate('/')}
          style="mt-8 rounded-full"
        />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: FONTS.PoppinsBold,
        color: "black"
    }
})

export default Successful