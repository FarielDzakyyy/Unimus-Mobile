import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface DropdownSelectProps {
  header: string; // Placeholder text
  options?: string[]; // List of options
  value?: string; // Currently selected value
  onSelect?: (val: string) => void; // Callback when selecting
  disabled?: boolean;
}

// Backwards compatible dropdown: if no options provided it behaves as a static button-like UI
const Dropdownselect: React.FC<DropdownSelectProps> = ({
  header,
  options = [],
  value,
  onSelect,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const hasOptions = options && options.length > 0;

  const toggle = () => {
    if (!hasOptions || disabled) return;
    setOpen((o) => !o);
  };

  const handleSelect = (val: string) => {
    onSelect?.(val);
    setOpen(false);
  };

  return (
    <View className="w-full relative" /* container for absolute list */>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={toggle}
        activeOpacity={0.7}
        className={`flex flex-row items-center justify-between bg-white rounded-lg p-2 px-4 w-full border border-gray-300 shadow-md ${disabled ? "opacity-60" : ""}`}
      >
        <Text className={`font-semibold ${value ? "text-black" : "text-bgColor-BLUE"}`} numberOfLines={1}>
          {value || header}
        </Text>
        {hasOptions && (
          <FontAwesome name={open ? "angle-up" : "angle-down"} size={20} color="black" />
        )}
      </TouchableOpacity>
      {open && hasOptions && (
        <View className="absolute top-14 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 z-50">
          <ScrollView nestedScrollEnabled>
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => handleSelect(opt)}
                  className={`px-4 py-2 flex-row justify-between items-center ${selected ? "bg-bgColor-BLUE/10" : ""}`}
                >
                  <Text className={`text-sm ${selected ? "text-bgColor-BLUE font-semibold" : "text-black"}`}>{opt}</Text>
                  {selected && <FontAwesome name="check" size={14} color="#004AAD" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdownselect;
