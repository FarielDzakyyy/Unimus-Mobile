import { FONTS } from '@/constants/Font';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dual toggle button (no routing). Controlled via value/onChange or internal state.
interface ToggleNavProps {
    text1: string;
    text2: string;
    value?: 1 | 2;
    initial?: 1 | 2;
    onChange?: (v: 1 | 2) => void;
}

const Button: React.FC<ToggleNavProps> = ({
    text1,
    text2,
    value,
    initial = 1,
    onChange
}) => {
    // Internal state only if not controlled
    const [internal, setInternal] = useState<1 | 2>(initial);

    // Derive active index
    const activeIndex: 1 | 2 = useMemo(() => {
        if (value) return value;
        return internal;
    }, [value, internal]);

    // Handlers
    const handlePress = useCallback((idx: 1 | 2) => {
        if (!value) {
            setInternal(idx);
        }
        onChange?.(idx);
    }, [value, onChange]);

    const baseSegmentClasses = 'flex-1 p-1 rounded-full';

    const firstActive = activeIndex === 1;
    const secondActive = activeIndex === 2;

    return (
        <View className="flex flex-row p-2 bg-gray-100/30 rounded-full gap-2">
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: firstActive }}
                className={`${baseSegmentClasses} ${firstActive ? 'bg-primary' : 'bg-white shadow-2xl shadow-black elevation-8'}`}
                onPress={() => handlePress(1)}
                activeOpacity={0.8}
            >
                <Text style={styles.text} className={`${firstActive ? 'text-white' : 'text-primary'} text-center`}>
                    {text1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: secondActive }}
                className={`${baseSegmentClasses} ${secondActive ? 'bg-primary' : 'bg-white shadow-2xl shadow-black elevation-8'}`}
                onPress={() => handlePress(2)}
                activeOpacity={0.8}
            >
                <Text style={styles.text} className={`${secondActive ? 'text-white' : 'text-primary'} text-center`}>
                    {text2}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: FONTS.PoppinsBlack,
    }
})