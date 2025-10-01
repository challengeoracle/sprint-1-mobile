import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const QuickActionButton = ({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} className="items-center gap-2">
            <View className="bg-white p-4 rounded-full border border-medix-200 shadow-sm">
                <Feather name={icon} size={24} color="#008080" />
            </View>
            <Text className="text-medix-800 font-semibold">{label}</Text>
        </TouchableOpacity>
    );
};

export default QuickActionButton;
