import { TextInput, TextInputProps, View, Text } from "react-native";
import { clsx } from "clsx";

interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

export function Input({ label, errorMessage, className, ...rest }: InputProps) {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-gray-300 text-sm font-medium mb-2">
          {label}
        </Text>
      )}
      
      <TextInput 
        className={clsx(
          "w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:border-green-100 text-base",
          errorMessage && "border-red-500",
          className
        )}
        placeholderTextColor="#9CA3AF" // gray-400
        {...rest}
      />

      {errorMessage && (
        <Text className="text-red-500 text-xs mt-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}