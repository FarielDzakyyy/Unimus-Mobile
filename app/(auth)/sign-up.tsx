import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  //   const submit = async () => {
  //     const { name, email, password } = form;
  //   if(!name || !form.email || !password) {
  //    return Alert.alert('Error', 'Please enter valid email and password.');
  //   }

  //     setIsSubmitting(true);

  //     try {
  //       await createUser({ email, password,  name });

  //       router.replace('/')
  //     } catch (error: any) {
  //       Alert.alert('Error', error.message);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  // }

  return (
    <View className={"gap-10 bg-bgColor rounded-xl p-5 mt-5"}>
      <View className="flex justify-center flex-row gap-2 mt-5">
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
