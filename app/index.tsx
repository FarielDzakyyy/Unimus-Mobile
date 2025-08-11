import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        This will be the Home Page!!
      </Text>
      <Link href="/sign-up">
        Sign up
      </Link>
    </View>
  );
}