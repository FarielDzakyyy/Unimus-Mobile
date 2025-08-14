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
          <View className="flex-row items-center gap-5">
            {/* <TouchableOpacity className="p-2 rounded-full bg-white/10">
              <Ionicons name="notifications-outline" size={20} color="white" />
            </TouchableOpacity> */}
            <TouchableOpacity className="p-2 rounded-full bg-white/10"
              onPress={() => { router.push("/(tabs)/Profile") }}
            >
              <Ionicons name="settings-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student Profile Card (overlapping) */}
        <View className="relative px-4 z-10 -mt-4">
          <View
            className="bg-white rounded-2xl p-5 shadow-xl border border-gray-50"
            style={{ elevation: 6 }}
          >
            <View className="flex flex-col items-center">
              <View className="h-auto w-auto rounded-full bg-white items-center justify-center p-1 shadow-xl shadow-black">
                <Image
                  source={images.personCircleOutline}
                  style={{ height: 55, width: 55 }}
                  className="rounded-full "
                />
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-dark-100">
                  Richmond Ampah-Mensah
                </Text>
                <Text className="text-gray-100 mt-0.5">C2C023012</Text>
                <Text className="text-lg font-bold text-primary">
                  Fakultas Teknik dan Ilmu Komputer
                </Text>
                <Text className="text-gray-100 mt-0.5">Informatika</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row mt-5 bg-tertiary rounded-xl overflow-hidden">
              <View className="flex-1 p-4 items-center justify-center">
                <Text className="text-xs text-gray-100 mb-1">IPS</Text>
                <Text className="text-base font-semibold text-primary">
                  3.80
                </Text>
              </View>
              <View className="w-px bg-gray-200/40" />
              <View className="flex-1 p-4 items-center justify-center">
                <Text className="text-xs text-gray-100 mb-1">IPK</Text>
                <Text className="text-base font-semibold text-primary">
                  3.75
                </Text>
              </View>
              <View className="w-px bg-gray-200/40" />
              <View className="flex-1 p-4 items-center justify-center">
                <Text className="text-xs text-gray-100 mb-1">SKS</Text>
                <Text className="text-base font-semibold text-primary">96</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content (pushed up so card overlaps) */}
        <View
          style={{ marginTop: -120 }}
          className="bg-bgColor rounded-t-2xl flex-1 pt-40 min-h-full pb-10"
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
                <View className="h-12 w-12 rounded-md bg-primary/10 items-center justify-center mb-3 p-2">
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
            ListFooterComponent={<View style={{ height: 8 }} />}
          />

          {/* Footer Space */}
          <View className="h-4" />
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
