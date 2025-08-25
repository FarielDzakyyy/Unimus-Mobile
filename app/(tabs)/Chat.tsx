import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Chat = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", role: "bot", text: "Hi, I'm UNIMUS BOT. How can I help you today?" },
    { id: "2", role: "user", text: "I need info about my schedule." },
  ]);
  const listRef = useRef<FlatList>(null);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", text: input.trim() } as const;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // Simple placeholder bot reply (echo). Replace with real API call.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: `You said: ${userMsg.text}`,
        },
      ]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 600);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, [input]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/** Header */}
        <View className="flex flex-row items-center p-4 mt-10 gap-4 border-b border-tertiary">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={26} color={Colors.primary} />
          </TouchableOpacity>
          <View className="items-center justify-center rounded-full bg-primary w-12 h-12">
            <Image source={images.avatar} className="rounded-full w-12 h-12" />
          </View>
          <View className="flex flex-col items-start">
            <Text className="text-lg font-bold">UNIMUS BOT</Text>
            <Text className="text-xs text-primary">Online</Text>
          </View>
        </View>

        {/** Messages */}
        <FlatList
          ref={listRef}
          data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 mb-3",
                  item.role === "user"
                    ? "self-end bg-primary"
                    : "self-start bg-secondary"
                )}
              >
                <Text className={cn("text-md", item.role === "user" ? "text-white" : "text-white")}>
                  {item.text}
                </Text>
              </View>
            )}
        />

        {/** Input Bar */}
        <View className="flex-row items-center justify-end gap-2 p-3 bg-white border-t border-gray-300">
          <TextInput
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            multiline
            className="flex-1 min-h-[40px] rounded-xl bg-primary/10 px-4 py-2 text-md"
            placeholderTextColor="#878787"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            onPress={sendMessage}
            className={cn(
              "rounded-full p-3",
              input.trim() ? "bg-primary" : "bg-primary/10"
            )}
            disabled={!input.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={input.trim() ? "#fff" : Colors.gray}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
