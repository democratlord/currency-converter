import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useTheme } from "@/contexts/ThemeContext";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const OnboardingScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black p-6">
      {/* Theme Toggle Button */}
      <TouchableOpacity
        onPress={toggleTheme}
        className="absolute top-20 right-6"
      >
        {isDarkMode ? (
          <Fontisto name="sun" size={24} color="yellow" />
        ) : (
          <FontAwesome name="moon-o" size={24} color="black" />
        )}
      </TouchableOpacity>

      {/* Animated Currency Icons */}
      <View className="flex-row space-x-4 mb-10">

          <Text className="text-4xl">💵</Text>
        
          <Text className="text-4xl">💶</Text>
        
          <Text className="text-4xl">💷</Text>
        
          <Text className="text-4xl">💴</Text>

      </View>

      {/* Heading and Description */}
      <Text className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
        Добро пожаловать в приложение!
      </Text>
      <Text className="text-lg text-gray-500 dark:text-gray-400 text-center mb-10">
      Ваш надежный конвертер валют
      </Text>

      {/* Get Started Button */}
      <CustomButton title="Начать" onPress={() => router.push("/home")} />
    </View>
  );
};

export default OnboardingScreen;
