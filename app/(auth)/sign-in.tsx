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
    password: "" 
  });
  const router = useRouter();

  const submit = async () => {
    const { nim, password } = form;
    
    if(!nim || !password) {
      return Alert.alert('Error', 'Please enter your NIM and password.');
    }

    setIsSubmitting(true);

    try {
      // Implement authentication logic here
      console.log('Sign in data:', form);
      
      // validation against user database here
      
      router.replace('/successful')
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-6 bg-bgColor rounded-xl p-6">
      <View className="gap-4">
        <Text className="text-2xl font-bold text-center text-dark-100 mb-2">
          Welcome Back
        </Text>
        <Text className="text-gray-100 text-center mb-4">
          Sign in with your student credentials
        </Text>

        <CustomInput
          label="Student ID (NIM)"
          placeholder="Enter your NIM"
          value={form.nim}
          onChangeText={(text) => setForm({ ...form, nim: text })}
          keyboardType="default"
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
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