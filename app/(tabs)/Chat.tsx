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
    { id: "1", role: "bot", text: "Hai, saya UNIMUS BOT. Ada yang bisa saya bantu hari ini?" },
  ]);
  const listRef = useRef<FlatList>(null);

  // Daftar jawaban untuk kata kunci
  const botResponses: Record<string, string> = {
    
  krs: "Kartu Rencana Studi (KRS) dapat dilihat di halaman beranda pada bagian Kartu Rencana Studi.",

  khs: "Kartu Hasil Studi (KHS) dapat diakses melalui halaman beranda pada bagian Kartu Hasil Studi.",

  transkrip: "Transkrip Akademik dapat dilihat di halaman beranda pada bagian Transkrip Akademik.",

  "kalender akademik": "Kalender Akademik dapat diakses di halaman beranda pada bagian Kalender Akademik.",

  jadwal: "Jadwal kuliah dapat dilihat di portal akademik sesuai dengan KRS kamu.",

  ujian: "Jadwal ujian diumumkan melalui portal akademik dan biasanya juga dibagikan di grup kelas.",

  pembayaran: "Pembayaran UKT dilakukan melalui bank mitra UNIMUS sesuai jadwal yang tercantum di portal akademik.",

  nilai: "Nilai mata kuliah dapat dilihat di portal akademik setelah dosen menginput nilai.",

  "cek nilai": "Kamu dapat mengecek nilai di portal akademik pada menu KHS.",

  "nilai saya": "Nilai dapat diakses melalui portal akademik menggunakan akun mahasiswa."

  };

  const getBotReply = (text: string): string => {
    const lower = text.toLowerCase();
    for (const key in botResponses) {
      if (lower.includes(key)) {
        return botResponses[key];
      }
    }
    return "Maaf, saya belum punya informasi tentang itu. Coba hubungi bagian akademik.";
  };

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", text: input.trim() } as const;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot reply
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getBotReply(userMsg.text),
      };
      setMessages((prev) => [...prev, botMsg]);
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
                item.role === "user" ? "self-end bg-primary" : "self-start bg-secondary"
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
            className="flex-1 min-h-[50px] rounded-xl bg-primary/10 px-5 py-5 text-md justify-end"
            placeholderTextColor="#878787"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            onPress={sendMessage}
            className={cn("rounded-full p-3 justify-end", input.trim() ? "bg-primary" : "bg-primary/10")}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={20} color={input.trim() ? "#fff" : Colors.gray} />
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
