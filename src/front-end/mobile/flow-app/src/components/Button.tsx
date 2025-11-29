import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import { clsx } from "clsx";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "outline";
}

export function Button({ title, isLoading = false, variant = "primary", className, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      disabled={isLoading}
      activeOpacity={0.7}
      className={clsx(
        "w-full p-4 rounded-lg items-center justify-center flex-row",
        variant === "primary" ? "bg-green-100" : "bg-transparent border border-green-100",
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? "#1a1a1a" : "#c0fd2b"} />
      ) : (
        <Text className={clsx(
          "text-base font-bold",
          variant === "primary" ? "text-gray-900" : "text-green-100"
        )}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}