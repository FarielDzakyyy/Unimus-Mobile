import { FONTS } from '@/constants/Font'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type TabKey = 1 | 2

interface ButtonProps {
    text1: string
    text2: string
    active: TabKey
    onChange: (tab: TabKey) => void
    className?: string
}

// Segmented two-option toggle button
const Button = ({ text1, text2, active, onChange, className }: ButtonProps) => {
    return (
        <View className={`flex flex-row p-2 bg-gray-100/30 rounded-full gap-2 ${className || ''}`}>
            <TouchableOpacity
                accessibilityRole="button"
                onPress={() => active !== 1 && onChange(1)}
                className={`flex-1 p-1 rounded-full justify-center ${active === 1 ? 'bg-primary' : 'bg-white border border-gray-400 elevation-xl'}`}
            >
                <Text style={styles.text} className={`${active === 1 ? 'text-white' : 'text-primary'} text-center`}>{text1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="button"
                onPress={() => active !== 2 && onChange(2)}
                className={`flex-1 p-1 rounded-full justify-center ${active === 2 ? 'bg-primary' : 'bg-white border border-gray-400 elevation-xl'}`}
            >
                <Text style={styles.text} className={`${active === 2 ? 'text-white' : 'text-primary'} text-center`}>{text2}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: FONTS.PoppinsBlack,
    },
    elevation: { 
        shadowColor:'#000', 
        shadowOpacity:0.15, 
        shadowOffset:{width:0,height:2}, 
        shadowRadius:4, 
        elevation:4 
    }
})