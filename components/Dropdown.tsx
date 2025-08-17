import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

type DropdownProps = {
  header: string;
  description: string;
  title?: string;
  id?: string;
  isControlled?: boolean;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
};

const Dropdown = ({
  header,
  description,
  title,
  id = "default",
  isControlled = false,
  isOpen: externalIsOpen,
  onToggle
}: DropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const toggleDropdown = () => {
    if (isControlled && onToggle) {
      onToggle(id);
    } else {
      setInternalIsOpen(!internalIsOpen);
      Animated.timing(rotateAnim, {
        toValue: !internalIsOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View className="flex flex-col mt-2 mx-4">
      {title && (
        <Text className="text-secondary font-extrabold text-[18px]">
          {title}
        </Text>
      )}

      <View className={`overflow-hidden ${isOpen ? "rounded-xl" : "rounded-xl"}`}>
        <TouchableOpacity 
          onPress={toggleDropdown}
          className={`bg-primary  p-3 flex-row items-start justify-between ${
            isOpen ? "rounded-t-xl rounded-b-0" : "rounded-xl"
          }`}
        >
          <Text className="text-white font-semibold">{header}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <FontAwesome name="angle-down" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
        
        {isOpen && (
          <View className="bg-primary/10 p-3 rounded-b-xl border border-primary">
            <Text className="text-gray-700">{description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Dropdown;
