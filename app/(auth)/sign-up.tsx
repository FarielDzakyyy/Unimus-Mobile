import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { SignUpForm } from "@/type";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SignUpForm>({ 
    name: "", 
    email: "", 
    nim: "", 
    password: "" 
  });
  const router = useRouter();

  const submit = async () => {
    const { name, email, nim, password } = form;
    
    if(!name || !email || !nim || !password) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }

    if (nim.length < 8) {
      return Alert.alert('Error', 'NIM must be at least 8 characters long.');
    }

    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters long.');
    }

    setIsSubmitting(true);

    try {
      // sign up logic here 

      console.log('Sign up data:', form);
      
      Alert.alert(
        'Success', 
        'Registration successful! You can now sign in with your NIM and password.',
        [
          { text: 'OK', onPress: () => router.replace('/sign-in') }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-6 bg-bgColor rounded-xl p-6">
      <View className="gap-4">
        {/* <Text className="text-2xl font-bold text-center text-dark-100 mb-2">
          Create Account
        </Text> */}
        <Text className="text-gray-100 text-center mb-4">
          Enter your details to register as a student
        </Text>

        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />

        <CustomInput
          label="Student ID (NIM)"
          placeholder="Enter your NIM"
          value={form.nim}
          onChangeText={(text) => setForm({ ...form, nim: text })}
          keyboardType="default"
        />

        <CustomInput
          label="Password"
          placeholder="Create a password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry
        />

        <CustomButton
          title="Sign Up"
          onPress={submit}
          isLoading={isSubmitting}
          style="mt-4"
        />
      </View>

      <View className="flex justify-center flex-row gap-2 mt-6 mb-8">
        <Text className="text-gray-100">Sudah punya akun?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Masuk
        </Link>
      </View>
    </View>
  );
};

export default SignUp;