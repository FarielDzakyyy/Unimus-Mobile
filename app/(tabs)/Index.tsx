import { images, menuItems } from "@/constants";
import { FONTS } from "@/constants/Font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Prestasi from "./Prestasi";
import ProfileCard from "./ProfileCard";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-12 pb-10">
          <Image source={images.logoWhite} style={{ height: 28, width: 115 }} />
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-2 rounded-full bg-white/10">
              <Ionicons name="notifications-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded-full bg-white/10"
              onPress={() => { router.push("/Profile") }}
            >
              <Ionicons name="settings-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student Profile Card */}
        <ProfileCard />

        {/* Main Content */}
        <View
          style={{ marginTop: -120 }}
          className="bg-bgColor rounded-t-3xl flex-1 pt-40 min-h-full pb-10"
        >
          {/* Section Title */}
          <Text style={styles.menuTitle}>Menu Sistem Informasi</Text>

          {/* Menu Grid */}
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 14, paddingHorizontal: 24 }}
            contentContainerStyle={{ gap: 14 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 items-center bg-white rounded-2xl p-4 shadow-md shadow-black"
                onPress={() => {
                  // navigate or handle action
                  router.push(item.path as any);
                  console.log("Pressed:", item.name);
                }}
              >
                <View className="h-12 w-12 rounded-md items-center justify-center mb-3 p-3">
                  <Image
                    source={item.icon}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-sm font-semibold text-dark-100 leading-tight">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <>
                <View style={{ height: 8 }} />
                <Prestasi />
              </>
            }
          />
          {/* Footer Space */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 16,
    fontFamily: FONTS.PoppinsBold,
    color: "black",
    marginBottom: 10,
    paddingHorizontal: 24,
  },
});
