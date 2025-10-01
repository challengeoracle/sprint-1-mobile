import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const UnitCard = ({ name, address, type }: { name: string; address: string; type: "HOSPITAL" | "CLINICA" | "LABORATORIO" }) => {
    // Fazendo a decisão do que é na mão por enquanto
    const iconName = type === "HOSPITAL" ? "plus-circle" : type === "CLINICA" ? "clipboard" : "thermometer";
    const iconColor = type === "HOSPITAL" ? "#c13832" : type === "CLINICA" ? "#2e72d2" : "#369369";

    return (
        <View className="bg-white rounded-lg p-4 flex-row items-center shadow-sm">
            <Feather name={iconName as any} size={28} color={iconColor} />
            <View className="flex-1 ml-4">
                <Text className="text-base font-bold text-medix-900">{name}</Text>
                <Text className="text-sm text-medix-700">{address}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#b0b0b0" />
        </View>
    );
};

export default UnitCard;
