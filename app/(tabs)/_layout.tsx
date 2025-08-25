import { Colors } from "@/constants/Colors";
import { TabBarIconProps } from "@/type";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from "@react-navigation/elements";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    {icon}
    <Text
      className={cn(
        "text-sm font-bold",
        focused ? "text-primary" : "text-gray-100"
      )}
    >
      {title}
    </Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          height: 90,
          position: "absolute",
          backgroundColor: "white",
        },
        headerPressOpacity: 1,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            pressColor="transparent" //For android
            pressOpacity={0.3} //For ios
          />
        ),
      }}
    >
      <Tab.Screen
        name="Index"
        component={require('./Index').default}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Home"
              icon={
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? Colors.primary : Colors.gray}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Jadwal"
        component={require('./Jadwal').default}
        options={{
          title: "Jadwal",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Jadwal"
              icon={
                <MaterialCommunityIcons 
                name="bookshelf" 
                size={24} 
                color={focused ? Colors.primary : Colors.gray} />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={require('./Chat').default}
        options={{
          title: "Ask AI",
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Ask AI"
              icon={
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color={focused ? Colors.primary : Colors.gray}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={require('./Profile').default}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              icon={
                <FontAwesome
                  name="user-circle-o"
                  size={24}
                  color={focused ? Colors.primary : Colors.gray}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;
