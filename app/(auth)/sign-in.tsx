import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { SignInForm } from "@/type";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SignInForm>({
    nim: "",
    password: "",
  });
  const router = useRouter();

  const submit = async () => {
    const { nim, password } = form;

    if (!nim || !password) {
      return Alert.alert("Error", "Please enter your NIM and password.");
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://192.168.100.107/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nim=${encodeURIComponent(nim)}&password=${encodeURIComponent(password)}`
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (result.status === "success") {
        Alert.alert("Success", result.message);

        // arahkan sesuai "redirect" dari backend
        if (result.redirect === "loginberhasil.html") {
          router.replace("/Index"); // ke halaman utama app
        } else {
          router.replace("/Index");
        }
      } else {
        Alert.alert("Error", result.message);
      }

    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-6 bg-bgColor rounded-xl p-6">
      <View className="gap-4">
        <Text className="text-gray-100 text-center mb-4">
          Masuk dengan kredensial mahasiswa Anda
        </Text>

        <CustomInput
          label="NIM"
          placeholder="Masukkan NIM"
          value={form.nim}
          onChangeText={(text) => setForm({ ...form, nim: text })}
        />

        <CustomInput
          label="Password"
          placeholder="Masukkan Password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry
        />

        <CustomButton
          title="Sign In"
          onPress={submit}
          isLoading={isSubmitting}
          style="mt-4"
        />
      </View>

      <View className="flex justify-center flex-row gap-2 mt-6">
        <Text className="text-gray-100">Belum punya akun?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Daftar
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
