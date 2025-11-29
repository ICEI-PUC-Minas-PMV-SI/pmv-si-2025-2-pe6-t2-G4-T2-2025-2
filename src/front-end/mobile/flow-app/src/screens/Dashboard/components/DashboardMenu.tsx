import React from "react";
import { Modal, Pressable, View, Text, TouchableOpacity } from "react-native";
import { User, LogOut } from "lucide-react-native";

interface DashboardMenuProps {
  visible: boolean;
  onClose: () => void;
  onProfile: () => void;
  onSignOut: () => void;
}

export function DashboardMenu({ visible, onClose, onProfile, onSignOut }: DashboardMenuProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={onClose}>
        <View className="absolute top-28 left-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg w-48 overflow-hidden">
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 border-b border-gray-700 active:bg-gray-700"
            onPress={onProfile}
          >
            <User size={18} color="#c0fd2b" />
            <Text className="text-white font-medium ml-3">Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 active:bg-gray-700"
            onPress={onSignOut}
          >
            <LogOut size={18} color="#ef4444" />
            <Text className="text-red-500 font-medium ml-3">Sair</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}