import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  customStyles?: string;
  textStyles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, customStyles, textStyles }) => {
  return (
    <TouchableOpacity
      className={`py-4 rounded-lg items-center w-full bg-blue-500 dark:bg-blue-700`}
      onPress={onPress}
    >
      <Text className={`text-white text-lg font-bold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;