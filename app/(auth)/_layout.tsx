import { images } from '@/constants'
import { Slot } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'

export default function AuthLayout () {
   return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" />

        <ScrollView className={"bg-bgColor h-full "} keyboardShouldPersistTaps="handled">
          <View className={'w-full relative'} style={styles.imageContainer}>
            <ImageBackground 
              source={images.loginGraphic}
              className={'size-full rounded-b-lg '}
              resizeMode='cover'
            >
              <View className='flex-row justify-center items-center -bottom-20 px-4'>
                <Image 
                source={images.logo} 
                className={''}
              />
              </View>
              <View className='flex-row justify-center items-center -bottom-20 px-4'>
                <Text className='text-2xl font-bold text-white'>Sistem Informasi Akademik unimus</Text>
              </View>
            </ImageBackground> 
          </View>
        <Slot />
        </ScrollView>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get("screen").height * 0.3,
  }
})
