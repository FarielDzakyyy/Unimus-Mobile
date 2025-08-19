import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

type DropdownProps = {
  header: string;
  description?: string; // description now optional to allow custom children later
  title?: string;
  id?: string;
  isControlled?: boolean;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
  color?: 'primary' | 'secondary';
  children?: React.ReactNode;
};

const Dropdown = ({
  header,
  description,
  title,
  id = "default",
  isControlled = false,
  isOpen: externalIsOpen,
  onToggle,
  className = "",
  color = 'primary',
  children
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

  const headerBgClass = color === 'secondary' ? 'bg-secondary' : 'bg-primary';
  const contentBorderClass = color === 'secondary' ? 'border-secondary' : 'border-primary';
  const contentBgClass = color === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10';

  return (
    <View className={`flex flex-col mt-2 mb-2`}>
      {title && (
        <Text className="text-secondary font-extrabold text-[18px]">
          {title}
        </Text>
      )}

      <View className={`overflow-hidden ${isOpen ? "rounded-xl" : "rounded-xl"}`}>
        <TouchableOpacity 
          onPress={toggleDropdown}
          className={`${headerBgClass}  p-3 flex-row items-start justify-between ${className} ${
            isOpen ? "rounded-t-xl rounded-b-0" : "rounded-xl"
          }`}
        >
          <Text className="text-white font-semibold">{header}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <FontAwesome name="angle-down" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
        
        {isOpen && (
          <View className={`${contentBgClass} p-3 rounded-b-xl border ${contentBorderClass}`}>
            {children ? children : (
              <Text className="text-gray-700 whitespace-pre-line">{description}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Dropdown;
