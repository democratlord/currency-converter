import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useCurrency } from "@/contexts/CurrencyContext";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import currencyImg from "@/assets/images/currencyB.png";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/ThemeContext";
import CustomButton from "@/components/CustomButton";

const CurrencyConverterScreen = () => {
  const {
    baseCurrency,
    targetCurrency,
    convertedAmount,
    amount,
    exchangeRate,
    currencyList,
    setAmount,
    setBaseCurrency,
    setTargetCurrency,
    convertCurrency,
  } = useCurrency();

  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (currencyList.length > 0) {
      setLoading(false);
    }
  }, [currencyList]);

  const handleConvert = async () => {
    setLoading(true);
    await convertCurrency();
    setLoading(false);
  };

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className={`flex-1 bg-white dark:bg-[#121212]`}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View className="flex-1 items-center justify-center p-6">
        <View className="relative w-full mb-10 mt-4">
          <Text className={`text-2xl font-bold text-gray-800 dark:text-white`}>
          Конвертер валют
          </Text>
          <TouchableOpacity
            onPress={toggleTheme}
            className="absolute top-0 right-0 mt-2 mr-2"
          >
            {isDarkMode ? (
              <Fontisto name="sun" size={24} color="yellow" />
            ) : (
              <FontAwesome name="moon-o" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <Image source={currencyImg} style={{ width: 250, height: 250}} />

        <Text
          className={`self-start mb-2 fs-20 mt-10 font-semibold text-gray-600 dark:text-gray-300`}
        >
          Количество
        </Text>
        <TextInput
          placeholder="Введите сумму"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
          className={`border w-full p-3 mb-5 rounded text-center border-gray-300 text-black bg-white dark:border-gray-600 dark:text-white dark:bg-gray-800 `}
        />

        <View className="flex-row items-center justify-between w-full mb-4">
          <Picker
            selectedValue={baseCurrency}
            style={{ width: "40%" }}
            onValueChange={(value) => setBaseCurrency(value)}
          >
            {currencyList.map((currency) => (
              <Picker.Item
                key={currency}
                label={currency}
                value={currency}
                color={isDarkMode ? "black" : "black"}
              />
            ))}
          </Picker>

          <FontAwesome
            name="exchange"
            size={24}
            color={isDarkMode ? "white" : "gray"}
          />

          <Picker
            selectedValue={targetCurrency}
            style={{ width: "40%",  }}
            onValueChange={(value) => setTargetCurrency(value)}
          >
            {currencyList.map((currency) => (
              <Picker.Item
                key={currency}
                label={currency}
                value={currency}
                color={isDarkMode ? "black" : "black"}
              />
            ))}
          </Picker>
        </View>

        {/* Exchange Rate Card */}
        <View
          className={`w-full p-4 mb-3 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-green-100"
          }`}
        >
          <Text
            className={`text-lg font-medium text-center ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            {exchangeRate
              ? `1 ${baseCurrency} = ${exchangeRate?.toFixed(2)} ${targetCurrency}`
              : "Выберите валюты, чтобы увидеть курс обмена"}
          </Text>
        </View>

        {/* Converted Amount Card */}
        <View
          className={`w-full p-4 mb-4 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-green-100"
          }`}
        >
          <Text
            className={`text-lg font-medium text-center ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Конвертированная сумма: {convertedAmount?.toFixed(2) || "0"}
          </Text>
        </View>

        <CustomButton title="Конвертировать" onPress={handleConvert} />
      </View>
    </SafeAreaView>
  );
};

export default CurrencyConverterScreen;
